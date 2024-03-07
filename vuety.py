import html
import re
import glob
from string import Template

basic_tag_list = [
    'html', 'body', 'script', 'noscript', 'style', 'link', 'template',
    'a', 'b', 'p', 'div', 'span', 'ul', 'li', 'ol', 'table', 'tr', 'th', 'td', 'thead', 'tbody', 'img', 'form', 'input',
    'button', 'label',
    'header', 'section', 'article', 'main', 'nav', 'aside', 'details', 'summary',
]

dependency_data = {}


def debug_print(message, debug=False):
    if debug:
        print(message)


def format_vue(vue):
    vue_tag_pattern = re.compile(r'<[A-Z][a-zA-Z0-9]+( .*)?( />)?')


def create_loading_vue_output(fullpath, depth):
    prefix_space = ' ' * 2 * (depth + 1)
    with open(fullpath, "r", errors='ignore') as f:
        line = f.read()

        dependency_data[fullpath] = []
        vue_tag_pattern = re.compile(r'<[A-Z][a-zA-Z0-9]+( .*)?( />)?')
        for m in vue_tag_pattern.finditer(line, re.MULTILINE):
            vue_load_pattern = re.compile(r'<[A-Z][a-zA-Z0-9]+( .*)?( />)?')
            result = vue_load_pattern.search(m.group())
            loaded_vue = Template('${space}${filename}').substitute(filename=result.group(), space=prefix_space)
            debug_print(loaded_vue)
            dependency_data[fullpath].append(loaded_vue)
        debug_print('')


def create_directory_based_file_structure(directory_name, depth=0):
    dir_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+')
    vue_pattern = re.compile(r'^[A-Z][a-zA-Z0-9]+\.vue')
    js_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.js')
    ts_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.ts')
    css_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.css')
    img_pattern = re.compile(r'^[a-z][a-zA-Z0-9]+\.(png|jpg|bmp|webp)')

    depth += 1
    prefix_space = ' ' * 2 * depth
    if depth == 1:
        debug_print(' ' * 2 * (depth - 1) + directory_name)

    files = glob.glob(Template("./${dirname}/*").substitute(dirname=directory_name))
    for file in files:
        file_or_directory_fullpath = file[6:len(file)]
        file_or_directory = file_or_directory_fullpath.split('\\')
        split_name = file_or_directory[len(file_or_directory) - 1]
        dir_result = dir_pattern.search(split_name)
        vue_result = vue_pattern.search(split_name)
        js_result = js_pattern.search(split_name)
        ts_result = ts_pattern.search(split_name)
        css_result = css_pattern.search(split_name)
        img_result = img_pattern.search(split_name)

        if vue_result:
            debug_print(prefix_space + vue_result.group() + ':')
            create_loading_vue_output(directory_name + '/' + vue_result.group(), depth)
        elif js_result:
            debug_print(prefix_space + js_result.group())
            # dependency_data[directory_name + '/' + vue_result.group()] = js_result.group()
        elif ts_result:
            debug_print(prefix_space + ts_result.group())
        elif css_result:
            debug_print(prefix_space + css_result.group())
        elif img_result:
            debug_print(prefix_space + img_result.group())
        elif dir_result:
            debug_print(prefix_space + Template('${dirname}/').substitute(dirname=dir_result.group()))
            create_directory_based_file_structure(directory_name + '/' + dir_result.group(), depth)
        else:
            debug_print('')


def create_html_by_structure():
    with open('./vue_structure.html', mode='w') as f:
        s = \
            '''
<html>
  <head>
    <title>Vue Structure List</title>
  </head>
  <body>
    <style>
      html {
        height: 100vh;
      }

      body {
        height: 100vh;
        background-color: #fafafa;
      }
      body::-webkit-scrollbar {
        width: .8rem;
      }
      body::-webkit-scrollbar-track {
        border-radius: .5rem;
        background-color: #ececec;
      }
      body::-webkit-scrollbar-thumb {
        border-radius: .5rem;
        background-color: rgba(184, 184, 184, 0.9);
      }

      /*********** basic tags ***********/
      a {
        text-decoration: none;
      }

      summary {
        display: block;
        cursor: pointer;
      }
      summary::-webkit-details-marker {
        display: none;
      }

      /*********** component ***********/
      .c-flex {
        display: flex;
      }

      .c-flex--column {
        flex-direction: column;
      }

      .c-flex--alignCenter {
        align-items: center;
      }

      .c-toggleIcon {
      }
      details.p-vue__structure > summary > .c-toggleIcon:before {
        position: absolute;
        content: "";
        width: 0.6rem;
        height: 0.6rem;
        border-right: 4px solid #000;
        border-top: 4px solid #000;
        font-size: 2rem;
        transform: rotate(135deg);
        transition: .1s;
        margin: 0 .5rem;
      }
      details[open].p-vue__structure > summary > .c-toggleIcon:before {
        position: absolute;
        content: "";
        transform: rotate(-135deg) scaleY(-1);
        transition: .1s;
        margin: .35rem .5rem;
      }
      details.p-vue__dependency > summary > .c-toggleIcon:before {
        position: absolute;
        content: "";
        width: 0.6rem;
        height: 0.6rem;
        border-right: 4px solid #000;
        border-top: 4px solid #000;
        font-size: 2rem;
        transform: rotate(135deg);
        transition: .1s;
        margin: .4rem .5rem;
      }
      details[open].p-vue__dependency > summary > .c-toggleIcon:before {
        position: absolute;
        content: "";
        transform: rotate(-135deg) scaleY(-1);
        transition: .1s;
        margin: .75rem .5rem;
      }
      details.p-vue__contents > summary > .c-toggleIcon:before {
        position: absolute;
        content: "";
        width: 0.6rem;
        height: 0.6rem;
        border-right: 4px solid #000;
        border-top: 4px solid #000;
        font-size: 2rem;
        transform: rotate(135deg);
        transition: .1s;
        margin: .25rem .5rem;
      }
      details[open].p-vue__contents .c-toggleIcon:before {
        position: absolute;
        content: "";
        transform: rotate(-135deg) scaleY(-1);
        transition: .1s;
        margin: .6rem .5rem;
      }

      .c-border--bottomGray {
        border-bottom: 2px solid #CCC;
      }

      .c-border--bottomBlack {
        border-bottom: 3px solid #000;
      }

      .c-border--bottomLightblue {
        border-bottom: 3px solid #85ccff;
      }

      /*********** main ***********/
      .l-header {
      }

      .l-mainArea {
      }

      .p-container {
        box-sizing: border-box;
        margin: 0 auto;
        max-width: 1400px;
        width: 100vw;
      }

      .p-vue__box {
      }

      .p-vue__structure {
      }

      .p-vue__dependency {
      }

      .p-vue__title {
        font-size: 1.5rem;
        font-weight: 800;
      }

      .p-vue__contents {
        margin: 2rem;
        padding: .6rem 1rem;
        border: 1px solid #000;
        border-radius: .3rem;
      }

      .p-vue__contentSummary {
        flex-direction: row;
      }

      .p-vue__detailBox {
        margin: 1rem .3rem;
      }

      .p-vue__loadedFiles {
        margin: .5rem 0;
      }

      .p-vue__loadedFilename {
      }

      .p-vue__Arguments {
      }

      .p-vue__Argument {
      }

      .p-vue__Functions {
        margin: .5rem 0;
      }

      .p-vue__Function {
      }

      .p-vue__filename {
        font-size: 1.2rem;
      }

      .l-footer {
      }
    </style>
'''

        s += \
            f'''
    <header class="l-header">
    </header>

    <main class="l-mainArea">
      <section class="p-container">
        <!-- Vue file structure -->
        <section class="p-vue__box">
          <details class="p-vue__structure">
            <summary>
              <span>ファイル構造</span>
              <span class="c-toggleIcon"></span>
            </summary>
            <!-- Vueファイルの読み込み内容等の詳細情報 -->
          </details>
        </section>

'''

        s += \
            f'''
        <!-- Vue file dependencies -->
        <section class="p-vue__box">
          <details class="p-vue__dependency c-flex c-flex--column">
            <summary>
              <span class="p-vue__title">依存関係</span>
              <span class="c-toggleIcon"></span>
            </summary>
            <!-- Vueファイルの読み込み内容等の詳細情報 -->
'''
        for vue, loaded_vues in dependency_data.items():
            debug_print(loaded_vues)
            s += \
                f'''
            <details class="p-vue__contents">
              <summary class="c-border--bottomBlack">
                <span class="p-vue__filename c-border--bottomLightblue">{vue}</span>
                <span class="c-toggleIcon"></span>
              </summary>
              <!-- Vueファイルの読み込み内容等の詳細情報 -->
              <section class="p-vue__detailBox">
                <h3 class="c-border--bottomGray">Loading Vue Files</h3>
'''
            loaded = ''
            for loaded_vue in loaded_vues:
                loaded += \
                    f'''
                <section class="p-vue__loadedFiles c-flex c-flex--column">
                  <span class="p-vue__loadedFilename">{html.escape(loaded_vue)}</span>
                </section>
'''
            s += loaded
            s += \
                '''
                <h3 class="c-border--bottomGray">Arguments</h3>
                <section class="p-vue__Arguments c-flex c-flex--column">
                  <span class="p-vue__Argument">引数1</span>
                  <span class="p-vue__Argument">引数2</span>
                </section>

                <h3 class="c-border--bottomGray">Functions</h3>
                <section class="p-vue__Functions c-flex c-flex--column">
                  <span class="p-vue__Function">関数1</span>
                  <span class="p-vue__Function">関数2</span>
                </section>
              </section>
            </details>
'''
        s += \
            '''
          </details>
        </section>
      </section>
    </main>

    <footer class="l-footer">
    <footer>
  </body>
</html>
'''
        s = s.strip()
        f.write(s)


print('---------- start ----------')
create_directory_based_file_structure('src')
# print(dependency_data)
create_html_by_structure()
print('---------- finish ----------')
