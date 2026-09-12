import re

with open('demos.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'"layout-canvas": `.*?`,', '', content, flags=re.DOTALL)

with open('demos.ts', 'w', encoding='utf-8') as f:
    f.write(content)
