#include <windows.h>

// to set the wstring mode
#include <fcntl.h>
#include <io.h>

#include <unordered_map>
#include <vector>
#include <algorithm>
#include <filesystem>
#include <iostream>
#include <sstream> // stingstream

using namespace std;

namespace fs = std::filesystem;

class DirNode
{
public:
    uintmax_t totalSize = 0;
    size_t dirCount = 0;
    size_t fileCount = 0;
    std::unordered_map<std::wstring, DirNode *> dirs;

    ~DirNode()
    {
        for (auto const &[dir, node] : dirs)
        {
            // std::wcout << L"Node to be deleted: " << dir << "    " << node->totalSize << std::endl;
            delete node;
        }
    }
};

void printDirInfo(std::wstring path);
void recursive(std::wstring path, DirNode *root);
bool directory_exists(const wchar_t *szPath);
std::wstring readable_fs_kb(uintmax_t size /*in bytes*/);
std::wstring s2ws(const std::string &str);
const wchar_t *GetWC(const char *c);
char *readable_fs(double size /*in bytes*/, char *buf);

void wmain(int argc, wchar_t **argv)
{
    _setmode(_fileno(stdout), _O_U16TEXT);
    std::wstring path = std::wstring(argv[1]);
    // char buf[10];
    // std::wcout << readable_fs(17864, buf);
    if (!directory_exists(argv[1]))
    {
        std::wcout << L"The root directory does not exist: " << argv[1] << std::endl;
        return;
    }
    printDirInfo(path);
}

void printDirInfo(std::wstring root)
{
    DirNode *rootNode = new DirNode();
    recursive(root, rootNode);

    const size_t MAX_PATH_LEN = 50;
    uintmax_t entrySize;
    std::wstring readableSize;
    std::wstring entryCategory;
    for (const auto &entry : fs::directory_iterator(root))
    {
        std::wstring path = entry.path().wstring();
        if (entry.is_directory())
        {
            entryCategory = L"DIR  ";
            std::wstring filename = entry.path().filename().wstring();
            entrySize = rootNode->dirs.at(filename)->totalSize;
        }
        else
        {
            entryCategory = L"FILE ";
            entrySize = entry.file_size();
        }
        readableSize = readable_fs_kb(entrySize);
        // the type is int not size_t, to prevent overflow
        int spaceLen = MAX_PATH_LEN - path.length() - readableSize.length();
        std::wcout << entryCategory << std::wstring(5, ' ') << path << std::wstring(spaceLen > 0 ? spaceLen : 2, ' ') << readableSize << std::endl;
    }

    std::wcout << std::endl;
    std::wcout << L"Total dir count:  " << rootNode->dirCount << std::endl;
    std::wcout << L"Total file count: " << rootNode->fileCount << std::endl;
    std::wcout << L"Total file size:  " << readable_fs_kb(rootNode->totalSize) << std::endl;
    delete rootNode;
}

void recursive(std::wstring path, DirNode *root)
{
    for (const auto &entry : fs::directory_iterator(path))
    {
        std::wstring path = entry.path().wstring();
        std::wstring filename = entry.path().filename().wstring();
        if (entry.is_directory())
        {
            DirNode *child = new DirNode();
            root->dirs.emplace(filename, child);
            recursive(path, child);
            root->dirCount += child->dirCount + 1;
            root->fileCount += child->fileCount;
            root->totalSize += child->totalSize;
        }
        else
        {
            root->fileCount++;
            root->totalSize += entry.file_size();
        }
    }
}

/**
 * 16,463 KB
 */
std::wstring readable_fs_kb(uintmax_t size /*in bytes*/)
{
    uintmax_t kb = size / 1024;
    if (size % 1024)
    {
        kb++;
    }
    std::wstringstream wss;
    wss.imbue(std::locale("")); // format the size with comma
    wss << kb << L" KB";
    return wss.str();
}

bool directory_exists(const wchar_t *szPath)
{
    DWORD dwAttrib = GetFileAttributesW(szPath);

    return (dwAttrib != INVALID_FILE_ATTRIBUTES &&
            (dwAttrib & FILE_ATTRIBUTE_DIRECTORY));
}

/**
 * Convert string to wstring 
 */
std::wstring s2ws(const std::string &str)
{
    int size_needed = MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), NULL, 0);
    std::wstring wstrTo(size_needed, 0);
    MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), &wstrTo[0], size_needed);
    return wstrTo;
}

/**
 * Convert const char * to const wchar_t *
 */
const wchar_t *GetWC(const char *c)
{
    const size_t cSize = strlen(c) + 1;
    std::wstring wc(cSize, L'#');
    mbstowcs(&wc[0], c, cSize);
    return wc.c_str();
}

/**
 * The bigger unit, the more significant digits: 17.4 KB, 2.43MB, 34.456GB
 */
char *readable_fs(double size /*in bytes*/, char *buf)
{
    int i = 0;
    const char *units[] = {"B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"};
    while (size > 1024)
    {
        size /= 1024;
        i++;
    }
    sprintf(buf, "%.*f %s", i, size, units[i]);
    return buf;
}
