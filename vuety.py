import re
import glob
from string import Template

basic_tag_list = [
    'html', 'body', 'script', 'noscript', 'style', 'link', 'template',
    'a', 'b', 'p', 'div', 'span', 'ul', 'li', 'ol', 'table', 'tr', 'th', 'td', 'thead', 'tbody', 'img', 'form', 'input', 'button', 'label',
    'header', 'section', 'article', 'main', 'nav'
]

def create_app_vue_output():
    with open("src/App.vue", "r") as f:
        line = f.read()

        router_view_pattern = re.compile(r'<router-view></router-view>')
        result = router_view_pattern.search(line)
        if not result:
            print('no router-view in App.vue')

        print('App.vue:')
        vue_tag_pattern = re.compile(r'<[A-Z][a-zA-Z0-9]+ />')
        for m in vue_tag_pattern.finditer(line, re.MULTILINE):
            app_vue_load_pattern = re.compile(r'[A-Z][a-zA-Z0-9]+')
            result = app_vue_load_pattern.search(m.group())
            print(Template('  ${filename}.vue').substitute(filename=result.group()))
        print('')


def create_directory_based_file_structure(directory_name, depth = 1):
    dir_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+')
    vue_pattern = re.compile(r'^[A-Z][a-zA-Z0-9]+\.vue')
    js_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.js')
    ts_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.ts')
    css_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.css')
    img_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.(png|jpg|bmp|webp)')

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

        prefix_space = ' ' * 2 * depth
        if vue_result:
            print(prefix_space + vue_result.group())
        elif js_result:
            print(prefix_space + js_result.group())
        elif ts_result:
            print(prefix_space + ts_result.group())
        elif css_result:
            print(prefix_space + css_result.group())
        elif dir_result:
            print(prefix_space + Template('${dirname}/').substitute(dirname=dir_result.group()))
            depth+=1
            create_directory_based_file_structure(directory_name + '/' + dir_result.group(), depth)
        else:
            print('')


print('---------- start ----------')
create_app_vue_output()
create_directory_based_file_structure('src')
print('---------- finish ----------')
