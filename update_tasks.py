import re

task_file = r"C:\Users\david\.gemini\antigravity\brain\4213ddaf-603b-42a8-9702-506f5aa61224\task.md"

with open(task_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    match = re.search(r'- \[ \] (\d+)\.', line)
    if match:
        num = int(match.group(1))
        if 3 <= num <= 50:
            line = line.replace('- [ ]', '- [x]', 1)
    new_lines.append(line)

with open(task_file, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Updated task.md")
