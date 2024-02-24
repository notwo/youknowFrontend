import re
from string import Template

basic_tag_list = [
    'html', 'body', 'script', 'noscript', 'style', 'link', 'template',
    'a', 'b', 'p', 'div', 'span', 'ul', 'li', 'ol', 'table', 'tr', 'th', 'td', 'thead', 'tbody', 'img', 'form', 'input', 'button', 'label',
    'header', 'section', 'article', 'main', 'nav'
]

print('---------- start ----------')
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

print('---------- finish ----------')
