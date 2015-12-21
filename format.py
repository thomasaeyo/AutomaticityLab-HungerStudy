import csv

SURVEYLABELS = ["isNativeSpeaker", "nativeSpeakerAge", "currentAge", "gender", "guess", "unusual", "similarStudy"]
LABELS = ["username",  
"PracticeBlock_display_pencil",  
"PracticeBlock_point_water", 
"Block1_clean_pencil", 
"Block1_photo_water",  
"Block1_bottle_water", 
"Block1_movie_pencil", 
"Block1_irrigate_water",
"Block1_lake_pencil",
"Block1_swim_water",
"Block1_speaker_water",  
"Block1_soap_pencil",  
"Block1_ocean_water",  
"Block1_photo_pencil", 
"Block1_swim_pencil",  
"Block1_liquid_pencil",  
"Block1_suds_water", 
"Block1_ice_pencil", 
"Block1_liquid_water", 
"Block1_ice_water",  
"Block1_river_pencil", 
"Block1_wash_water", 
"Block1_shower_pencil",  
"Block1_bottle_pencil",  
"Block1_tree_water", 
"Block1_rain_pencil",  
"Block1_clean_water",  
"Block1_cup_pencil", 
"Block1_flood_water",  
"Block1_suds_pencil",  
"Block1_town_water", 
"Block1_shower_water", 
"Block1_wash_pencil",  
"Block1_tree_pencil",  
"Block1_book_water", 
"Block1_book_pencil",  
"Block1_tap_water",  
"Block1_cold_water", 
"Block1_glass_water",  
"Block1_speaker_pencil", 
"Block1_cold_pencil",
"Block1_town_pencil",
"Block1_flood_pencil",
"Block1_bath_water",
"Block1_camera_water",
"Block1_faucet_water",
"Block1_river_water",
"Block1_faucet_pencil",
"Block1_ocean_pencil",
"Block1_music_water",
"Block1_soap_water",
"Block1_camera_pencil",  
"Block1_drain_water",  
"Block1_tap_pencil", 
"Block1_rain_water", 
"Block1_irrigate_pencil",  
"Block1_rinse_water",  
"Block1_drain_pencil", 
"Block1_scrub_pencil",
"Block1_cup_water",
"Block1_rinse_pencil",
"Block1_bath_pencil",
"Block1_lake_water",
"Block1_movie_water",
"Block1_music_pencil",
"Block1_scrub_water",  
"Block1_glass_pencil", 
"isNativeSpeaker", 
"nativeSpeakerAge",  
"currentAge",  
"gender",  
"guess", 
"unusual", 
"similarStudy"] + SURVEYLABELS

def createParticipantData():
  participantData = {}
  with open('Mon_Dec_21_2015.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
      if row['username'] not in participantData:
        participantData[row['username']] = {"username" : row['username']}
      if len(row['block']) > 0:
        k = row['block'] + "_" + row['target'] + "_" + row['prime']
        rt = row['responseTime']
        if row['isCorrect'] == "FALSE":
          rt = 9999
        participantData[row['username']][k] = rt
      else:
        for k in SURVEYLABELS:
          participantData[row['username']][k] = row[k]
  return participantData



def reorderTrials(participantData):
  # print participantData
  reorderedData = []
  for key, data in participantData.iteritems():
    ordered_row = []
    for label in LABELS:
      ordered_row.append(data[label])
    reorderedData.append(ordered_row)
  return reorderedData

def writeNewCSV(data):
  with open('data_formatted.csv', 'wb') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    writer.writerow(LABELS)
    for row in data:
      writer.writerow(row)

writeNewCSV(reorderTrials(createParticipantData()))

