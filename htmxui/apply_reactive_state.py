import os
import re

directory = r"d:\@AIWorkspace\Apps & Tools\HTMXUI\views\components"

# Regex to find the first HTML tag that is not a comment or doctype
tag_pattern = re.compile(r'(<[a-zA-Z]+)([^>]*)>')

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Check if already processed to avoid duplicates
        if 'hx-ext="reactive"' in content:
            continue
            
        # Add hx-ext and a default configuration state to the root element
        # This allows users to easily hook into htmx-bolt for styling
        replacement = r'\1 hx-ext="reactive" hx-state="{ themeColor: \'primary\', size: \'md\', isOpen: false }" \2>'
        
        # We only want to replace the FIRST matching tag (the root element)
        new_content = tag_pattern.sub(replacement, content, count=1)
        
        # Add a helpful developer comment at the top
        header = f"<!-- \n  Component: {filename}\n  Configurable State: themeColor ('primary'|'secondary'|'destructive'), size ('sm'|'md'|'lg'), isOpen (boolean)\n  Usage: Bind styles dynamically using hx-class=\"{{ 'bg-primary': themeColor === 'primary' }}\" or hx-style=\"{{ width: size === 'lg' ? '100%' : 'auto' }}\"\n-->\n"
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(header + new_content)

print("Successfully injected htmx-bolt reactive configuration into all components.")
