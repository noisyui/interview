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
    std::unordered_map<std::wstring, DirNode> dirs;
};

void printDirInfo(std::wstring path);
uintmax_t recursive(std::wstring path, DirNode &root);
char *readable_fs(double size /*in bytes*/, char *buf);
std::wstring readable_fs_kb(uintmax_t size /*in bytes*/);
bool directory_exists(const char *szPath);
std::wstring s2ws(const std::string &str);

void main(int argc, char **argv)
{
    std::wstring path = s2ws(std::string(argv[1]));
    if (!directory_exists(argv[1]))
    {
        std::cout << "The root directory does not exist: " << argv[1];
        return;
    }
    printDirInfo(path);
}

void printDirInfo(std::wstring root)
{
    _setmode(_fileno(stdout), _O_U16TEXT);
    int i = 0;
    for (const auto &entry : fs::directory_iterator(root))
    {
        std::wstring path = entry.path().wstring();
        if (entry.is_directory())
        {
            DirNode root;
            std::wcout << "DIR  " << path << " " << readable_fs_kb(recursive(path, root)) << std::endl;
        }
        else
        {
            std::wcout << "FILE " << path << " " << readable_fs_kb(entry.file_size()) << std::endl;
        }
    }
}

uintmax_t recursive(std::wstring path, DirNode &root)
{
    for (const auto &entry : fs::directory_iterator(path))
    {
        std::wstring path = entry.path().wstring();
        std::wstring filename = entry.path().filename().wstring();
        if (entry.is_directory())
        {
            DirNode child;
            root.dirs.emplace(filename, child);
            root.totalSize += recursive(path, child);
        }
        else
        {
            root.totalSize += entry.file_size();
        }
    }

    return root.totalSize;
}

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

std::wstring readable_fs_kb(uintmax_t size /*in bytes*/)
{
    uintmax_t kb = size / 1024;
    if (size % 1024)
    {
        kb++;
    }
    std::stringstream ss;
    ss.imbue(std::locale("")); // format the size with comma
    ss << kb << " KB";
    return s2ws(ss.str());
}

bool directory_exists(const char *szPath)
{
    DWORD dwAttrib = GetFileAttributes(szPath);

    return (dwAttrib != INVALID_FILE_ATTRIBUTES &&
            (dwAttrib & FILE_ATTRIBUTE_DIRECTORY));
}

std::wstring s2ws(const std::string &str)
{
    int size_needed = MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), NULL, 0);
    std::wstring wstrTo(size_needed, 0);
    MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), &wstrTo[0], size_needed);
    return wstrTo;
}
