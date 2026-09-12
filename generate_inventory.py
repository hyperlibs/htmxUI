import json
import random

manufacturers = ["Cipla", "Sun Pharma", "Dr. Reddy's", "Lupin", "Aurobindo", "Zydus", "Torrent", "Alkem", "Glenmark", "Intas"]
drug_bases = ["Paracetamol", "Amoxicillin", "Cetirizine", "Ibuprofen", "Omeprazole", "Azithromycin", "Metformin", "Amlodipine", "Pantoprazole", "Rabeprazole", "Ciprofloxacin", "Levocetirizine", "Diclofenac", "Atorvastatin", "Losartan"]
suffixes = ["500mg", "250mg", "650mg", "10mg", "20mg", "40mg", "100mg", "Drops", "Syrup", "Ointment", "Gel", "Injection", "Capsule"]

inventory = []

# Generate 5000 items
for i in range(1, 5001):
    base = random.choice(drug_bases)
    mfg = random.choice(manufacturers)
    suffix = random.choice(suffixes)
    
    name = f"{base} {mfg} {suffix}"
    qty = random.choices([0, random.randint(10, 500)], weights=[0.1, 0.9])[0]
    cost = round(random.uniform(5.0, 1500.0), 2)
    
    qty_badge = f'<span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 border-green-500/20">{qty} Units</span>' if qty > 0 else '<span class="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold bg-destructive text-white">Out of Stock</span>'
    
    html = f"""
    <tr class="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer">
        <td class="p-4 font-semibold text-base">{name}</td>
        <td class="p-4">{qty_badge}</td>
        <td class="p-4 text-right font-mono font-medium">₹{cost}</td>
    </tr>
    """
    
    # Custom keywords for some items
    keywords = "fever pain" if "Paracetamol" in base else "antibiotic" if "Amoxicillin" in base else "allergy cold" if "Cetirizine" in base else ""
    search_string = f"{name} {mfg} {keywords}".lower()
    
    inventory.append({
        "_search": search_string,
        "html": html.strip().replace('\n', '')
    })

# Add the specific ones user asked for
inventory.insert(0, {
    "_search": "calpol 500mg tablet paracetamol fever pain antipyretic",
    "html": '<tr class="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"><td class="p-4 font-semibold text-base">Calpol 500mg Tablet</td><td class="p-4"><span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 border-green-500/20">150 Units</span></td><td class="p-4 text-right font-mono font-medium">₹45.00</td></tr>'
})
inventory.insert(1, {
    "_search": "dolo 650mg paracetamol fever pain",
    "html": '<tr class="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"><td class="p-4 font-semibold text-base">Dolo 650mg</td><td class="p-4"><span class="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold bg-destructive text-white">Out of Stock</span></td><td class="p-4 text-right font-mono font-medium">₹30.50</td></tr>'
})
inventory.insert(2, {
    "_search": "crocin advance paracetamol fever",
    "html": '<tr class="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"><td class="p-4 font-semibold text-base">Crocin Advance</td><td class="p-4"><span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-600 border-green-500/20">320 Units</span></td><td class="p-4 text-right font-mono font-medium">₹25.00</td></tr>'
})

with open("public/inventory.json", "w") as f:
    json.dump(inventory, f)

print(f"Generated {len(inventory)} items in public/inventory.json")
