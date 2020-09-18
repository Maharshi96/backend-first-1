import pandas as pd
import numpy as np
import pixiedust_node
from sklearn.impute import SimpleImputer
data = pd.read_csv("FOUND3.csv")
data.head(20)

#building dict
ilpn_status= {'Allocated': 1,'In inventory not putaway': 2, 'In Inventory not putaway': 2,
              'In Transit':3,'In transit':3,
              'Putaway':4,
              'Allocated and Pulled':5,'Allocated and pulled':5,
              'Cancelled':6,'Pulled':7, 'Consumed':8,
              'Case consumed to active':9, 'Not received but shipment verified':10}

Current_loc= {'BRACK':1, 'Unknown':2, 'DRACK':3, 'Drop':4, 'CRACK':5, 'Shipped':6,
              'AS4':7, 'AS1':8, 'AS2':9, 'AS0':10, 'Putlane':11}

Found_loc= {'Invalid':0,'MULTIST':1, 'CUBIST':2, 'ONPALLET':3, 'CRACK':4, 'BRACK':4,
            'DRACK':4, 'INLOAD':5, 'PUTLANE':6 }
ASN_status= {'Receiving Started':1, 'Receiving started':1, 'Cancelled':2, 'Receiving Verified':3,'In transit':4}

#dict in dataset
data.ilpn_status = [ilpn_status[item] for item in data.ilpn_status]
data.ASN_status = [ASN_status[item] for item in data.ASN_status]
data.Current_location =[Current_loc[item] for item in data.Current_location]
data.Found_location =[Found_loc[item] for item in data.Found_location]

import seaborn as sns
#finding correlation between diffrent features
relation = data.corr()

# ploting the heatmap
import matplotlib.pyplot as plt
plt.figure(figsize=(12, 9))
sns.heatmap(relation, xticklabels=relation.columns, yticklabels=relation.columns, annot=True)

data= data.drop('ilpn', 1)

#data analysis
x=data.drop('Found_location', 1).values
y=data['Found_location'].values

from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.30,random_state=1)
print(y)

from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification

clf = RandomForestClassifier(n_estimators=220, max_depth=5, random_state=0)
clf.fit(x_train, y_train)
y_pred = clf.predict(x_test)


#performance measurement
from sklearn.metrics import r2_score
score=r2_score(y_test,y_pred)

print(score)

from sklearn.model_selection import cross_val_score
scores= cross_val_score(clf,x,y, cv=7)
print(scores)
print(scores.mean())

%%node
var findbox = ([findbox])

#findbox for wms
finddata = pd.read_csv("findbox.csv")
fdata= finddata.drop('ilpn', 1)
fdata.ilpn_status = [ilpn_status[item] for item in fdata.ilpn_status]
fdata.ASN_status = [ASN_status[item] for item in fdata.ASN_status]
fdata.Current_location =[Current_loc[item] for item in fdata.Current_location]
fdata.head()

#predict location
onput_y = clf.predict(fdata)
print(onput_y)

Found_loc1= {0:'Invalid',1:'MULTIST',2:'CUBIST', 3:'ONPALLET', 4:'CRACK', 4: 'BRACK',
             4: 'DRACK', 5: 'INLOAD', 6:'PUTLANE' }
onput_y = [Found_loc1[item] for item in onput_y]

ilpn = finddata['ilpn']
findtable = pd.DataFrame(ilpn,onput_y, columns=['ilpn', 'Found_location']).to_csv('prediction.csv')
