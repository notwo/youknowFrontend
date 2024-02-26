import re
import glob
from string import Template

basic_tag_list = [
    'html', 'body', 'script', 'noscript', 'style', 'link', 'template',
    'a', 'b', 'p', 'div', 'span', 'ul', 'li', 'ol', 'table', 'tr', 'th', 'td', 'thead', 'tbody', 'img', 'form', 'input', 'button', 'label',
    'header', 'section', 'article', 'main', 'nav'
]

def create_loading_vue_output(fullpath, depth):
    prefix_space = ' ' * 2 * (depth + 1)
    with open(fullpath, "r", errors='ignore') as f:
        line = f.read()

        vue_tag_pattern = re.compile(r'<[A-Z][a-zA-Z0-9]+( .*)?( />)?')
        for m in vue_tag_pattern.finditer(line, re.MULTILINE):
            vue_load_pattern = re.compile(r'<[A-Z][a-zA-Z0-9]+( .*)?( />)?')
            result = vue_load_pattern.search(m.group())
            print(Template('${space}${filename}').substitute(filename=result.group(), space=prefix_space))
        print('')


def create_directory_based_file_structure(directory_name, depth = 0):
    dir_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+')
    vue_pattern = re.compile(r'^[A-Z][a-zA-Z0-9]+\.vue')
    js_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.js')
    ts_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.ts')
    css_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.css')
    img_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.(png|jpg|bmp|webp)')

    depth += 1
    prefix_space = ' ' * 2 * depth
    if depth == 1:
        print(' ' * 2 * (depth - 1) + directory_name)

    files = glob.glob(Template("./${dirname}/*").substitute(dirname=directory_name))
    for file in files:
        file_or_directory = file[6:len(file)]
        splitted = file_or_directory.split('\\')
        splitted_name = splitted[len(splitted) - 1]
        dir_result = dir_pattern.search(splitted_name)
        vue_result = vue_pattern.search(splitted_name)
        js_result = js_pattern.search(splitted_name)
        ts_result = ts_pattern.search(splitted_name)
        css_result = css_pattern.search(splitted_name)
        img_result = img_pattern.search(splitted_name)

        if vue_result:
            print(prefix_space + vue_result.group() + ':')
            create_loading_vue_output(directory_name + '/' + vue_result.group(), depth)
        elif js_result:
            print(prefix_space + js_result.group())
        elif ts_result:
            print(prefix_space + ts_result.group())
        elif css_result:
            print(prefix_space + css_result.group())
        elif img_result:
            print(prefix_space + img_result.group())
        elif dir_result:
            print(prefix_space + Template('${dirname}/').substitute(dirname=dir_result.group()))
            create_directory_based_file_structure(directory_name + '/' + dir_result.group(), depth)
        else:
            print('')


print('---------- start ----------')
create_directory_based_file_structure('src')
print('---------- finish ----------')
