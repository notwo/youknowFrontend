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

fullpath_list = list()
dependency_data = {}
define_props_data = {}
functions_data = {}
functions_arg_data = {}

def debug_print(message, debug=False):
    if debug:
        print(message)


def search_fullpath(text):
    for t in fullpath_list:
        if text in t:
            return t


def create_loading_vue_output(fullpath, depth):
    prefix_space = ' ' * 2 * (depth + 1)
    with open(fullpath, "r", errors='ignore') as f:
        file_string = f.read()

        fullpath_list.append(fullpath)
        dependency_data[fullpath] = list()
        define_props_data[fullpath] = list()
        functions_data[fullpath] = list()
        functions_arg_data[fullpath] = ''

        # loading vue file pattern
        vue_tag_pattern = re.compile(r'<[A-Z][a-zA-Z0-9]+ ?.+/')
        for m in vue_tag_pattern.finditer(file_string, re.MULTILINE):
            vue_load_pattern = re.compile(r'<[A-Z][a-zA-Z0-9]+')
            result = vue_load_pattern.search(m.group())
            loaded_vue = Template('${space}${filename}').substitute(filename=result.group(), space=prefix_space)
            s = loaded_vue.replace(' ', '')
            dependency_data[fullpath].append(s[1:])

        # arguments pattern
        arguments_pattern = re.compile(r'defineProps\(\{( |\r|\n|\r\n)*([a-zA-Z_]+: [a-zA-Z_]+,?( |\r|\n|\r\n)*)+')
        arguments_result = arguments_pattern.search(file_string)
        if arguments_result:
            arg_detail_pattern = re.compile(r'[a-zA-Z_]+: [a-zA-Z_]+')
            for m in arg_detail_pattern.finditer(arguments_result.group(), re.MULTILINE):
                define_props_data[fullpath].append(m.group())

        # functions pattern
        functions_pattern = re.compile(r'[a-zA-Z_]+ *= *\(.*\): *([a-zA-Z_]| )*=>( |\r|\n|\r\n)*{')
        func_detail_pattern = re.compile(r'[a-zA-Z_]+ *')
        func_arg_pattern = re.compile(r'\(.*\)')
        for m in functions_pattern.finditer(file_string, re.MULTILINE):
            functions_result = func_detail_pattern.search(m.group())
            if functions_result:
                functions_data[fullpath].append(functions_result.group())

            functions_arg_result = func_arg_pattern.search(m.group())
            if functions_arg_result:
                functions_arg_data[fullpath] = functions_arg_result.group()

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
      a:hover {
        color: red;
        font-weight: 800;
      }

      summary {
        display: block;
        cursor: pointer;
      }
      summary::-webkit-details-marker {
        display: none;
      }

      table {
        table-layout: auto;
        border-spacing: 2rem .2rem;
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

      .c-text--alignCenter {
        text-align: center;
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

      .c-list {
        position: relative;
      }
      .c-list:before {
        position: absolute;
        content: "◯";
        left: -1.2rem;
      }

      .c-color--black {
        color: black;
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
        border-radius: .2rem;
      }
      .p-vue__contents:hover {
        background-color: #85ccff;
      }

      .p-vue__contentSummary {
        flex-direction: row;
      }

      .p-vue__detailBox {
        margin: 1rem .3rem;
      }

      .p-vue__loadedFiles {
        margin: .5rem 0 .5rem 1.3rem;
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
            debug_print(loaded_vues, debug=False)

            # loading vues
            s += \
                f'''
            <details class="p-vue__contents">
              <summary id="{vue}" class="c-border--bottomBlack">
                <span class="p-vue__filename c-border--bottomLightblue">{vue}</span>
                <span class="c-toggleIcon"></span>
              </summary>
              <!-- Vueファイルの読み込み内容等の詳細情報 -->
              <section class="p-vue__detailBox">
                <h3 class="c-border--bottomGray">Loading Vue Files</h3>
'''

            if not loaded_vues:
                s += \
                    '''
                <section class="p-vue__loadedFiles c-flex c-flex--column">
                  <span class="p-vue__loadedFilename">No File...</span>
                </section>
'''

            loaded = ''
            for loaded_vue in loaded_vues:
                source = html.escape(search_fullpath(loaded_vue) or "")
                loaded += \
                    f'''
                <section class="p-vue__loadedFiles c-flex c-flex--column">
                  <a href="#{source}" class="c-color--black">
                    <span class="p-vue__loadedFilename c-list">{source}</span>
                  </a>
                </section>
'''

            # arguments
            s += loaded
            s += \
                '''
                <h3 class="c-border--bottomGray">Arguments</h3>
                <section class="p-vue__Arguments">
'''

            if define_props_data[vue]:
                s += \
                    '''
                  <table class="c-text--alignCenter">
                    <thead>
                      <tr>
                        <th>Variables</th>
                        <th>Var Type</th>
                      </tr>
                    </thead>
                    <tbody>
'''

            else:
                s += \
                    '''
                  <span>No Arguments...</span>
'''

            argument = ''
            for define_props in define_props_data[vue]:
                split_prop = re.split(r': *', define_props)
                argument += \
                    f'''
                      <tr>
                        <td>
                          <span>{split_prop[0]}</span>
                        </td>
                        <td>
                          <span>{split_prop[1]}</span>
                        </td>
                      </tr>
'''

            s += argument
            if define_props_data[vue]:
                s += \
                    '''
                    </tbody>
                  </table>
'''

            # functions
            s += \
                '''
                </section>

                <h3 class="c-border--bottomGray">Functions</h3>
                <section class="p-vue__Functions">
'''

            if functions_data[vue]:
                s += \
                    '''
                  <table class="c-text--alignCenter">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>func arguments</th>
                      </tr>
                    </thead>
                    <tbody>
'''

            else:
                s += \
                    '''
                  <span>No Functions...</span>
'''

            function = ''
            func_arg_list = list()
            for function_data in functions_data[vue]:
                split_function = function_data.split(r' *=')

                function_arg_string = functions_arg_data[vue].replace('(', '').replace(')', '')
                if function_arg_string.find(',') != -1:
                    multi_args = re.split(r', *', function_arg_string)
                    for arg in multi_args:
                        func_arg_list.append(re.split(r': *', arg))
                elif function_arg_string.find(':') != -1:
                    func_arg_list.append(re.split(r': *', function_arg_string))

                function += \
                    f'''
                      <tr>
                        <td>
                          <span>{split_function[0]}</span>
                        </td>
                        <td>
'''

                if func_arg_list:
                    for arg in func_arg_list:
                        arg_string = arg[0]
                        arg_type = arg[1]
                        function += \
                            f'''
                          <span>{arg_string} ({arg_type})</span>
                          <br>
'''

                elif function_arg_string != '':
                    function += \
                        f'''
                          <span>{function_arg_string}</span>
'''

                else:
                    function += \
                        '''
                          <span>No Func Arguments</span>
'''

                function += \
                    '''
                        </td>
                      </tr>
'''

            s += function
            if functions_data[vue]:
                s += \
                    '''
                    </tbody>
                  </table>
'''

            s += \
                '''
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
debug_print(functions_data, debug=False)
create_html_by_structure()
print('---------- finish ----------')
