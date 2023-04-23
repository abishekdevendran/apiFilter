# import json
import json
data = json.load(open('dataMod.json'))

# change all 'income' fields to floats
for i in range(len(data)):
    data[i]['income'] = float(data[i]['income'])
    data[i]['phone_price'] = int(data[i]['phone_price'])

# write back to file
with open('dataModOut.json', 'w') as outfile:
    json.dump(data, outfile, ensure_ascii=False)