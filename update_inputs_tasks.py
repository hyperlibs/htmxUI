import re

task_file = r"C:\Users\david\.gemini\antigravity\brain\4213ddaf-603b-42a8-9702-506f5aa61224\task.md"

with open(task_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

inputs_completed = [51, 55, 56, 62, 63, 64, 68, 69, 74, 75, 81, 86, 89, 90, 99, 100]

new_lines = []
for line in lines:
    match = re.search(r'- \[ \] (\d+)\.', line)
    if match:
        num = int(match.group(1))
        if num in inputs_completed:
            line = line.replace('- [ ]', '- [x]', 1)
    new_lines.append(line)

with open(task_file, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Updated task.md for Inputs & Controls")
