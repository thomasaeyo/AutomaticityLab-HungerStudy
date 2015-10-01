// usage:
// jsonToCSV(data, "Vehicle Report", true);

window.jsonToCSV = function (JSONData, ReportTitle) {
  //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  console.log(arrData);
  
  var CSV = "";
  var firstRow = arrData[0][0];
  var header = _.map(firstRow, function (pair) {
    return Object.keys(pair)[0];
  });
  header = header.join(",") + "\r\n"

  CSV += header;

  var rows = [];
  _.each(arrData, function (rowsInResponse) {
    _.each(rowsInResponse, function (rowInfo) {
      var row = "";
      _.each(rowInfo, function (pair) {
        // flatten
        row += '"' + pair[Object.keys(pair)[0]] + '",';  
      });
      rows.push(row);
    });
  });

  CSV += rows.join("\r\n");

  //Generate a file name
  //this will remove the blank-spaces from the title and replace it with an underscore
  var fileName = ReportTitle.replace(/ /g,"_");   
  
  //Initialize file format you want csv or xls
  var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
  
  // Now the little tricky part.
  // you can use either>> window.open(uri);
  // but this will not work in some browsers
  // or you will not get the correct file extension    
  
  //this trick will generate a temp <a /> tag
  var link = document.createElement("a");    
  link.href = uri;
  
  //set the visibility hidden so it will not effect on your web-layout
  link.style = "visibility:hidden";
  link.download = fileName + ".csv";
  
  //this part will append the anchor tag and remove it after automatic click
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

Template.Admin.onRendered(function() {
  var emptyRow = {
    username: "",
    block: "",
    target: "",
    prime: "",
    responseTime: "",
    keyPressed: "",
    isCorrect: "",
    isNativeSpeaker: "",
    nativeSpeakerAge: "",
    currentAge: "",
    gender: "",
    guess: "",
    unusual: "",
    similarStudy: "",
  };

  this.autorun(function() {
    var responses = Responses.find().fetch();


    if (responses.length) {
      // var resp = responses[2];

      var dataForCSV = _.map(responses, function (resp) {
        var rowsForThisResponse = [];
        var username = {username: resp.username};

        // TargetTaskResults
        _.each(resp.TargetTaskResults, function (result) {
          var row = _.clone(emptyRow);
          _.assign(row, result, username);
          rowsForThisResponse.push(row);
        });

        debugger

        var infoRow = _.clone(emptyRow);

        _.assign(infoRow, resp.debriefing, username);

        debugger

        rowsForThisResponse.push(infoRow);

        rowsForThisResponse = _.map(rowsForThisResponse, function (row) {
          var orderedRow = [
            {username: ""},
            {block: ""},
            {target: ""},
            {prime: ""},
            {responseTime: ""},
            {keyPressed: ""},
            {isCorrect: ""},
            {isNativeSpeaker: ""},
            {nativeSpeakerAge: ""},
            {currentAge: ""},
            {gender: ""},
            {guess: ""},
            {unusual: ""},
            {similarStudy: ""}
          ];

          for (key in row) {
            _.each(orderedRow, function (pair) {
              if (pair.hasOwnProperty(key)) {
                pair[key] = row[key];
              }
            });
          }

          return orderedRow;
        });
      
        return rowsForThisResponse;

      });

      window.dataForCSV = dataForCSV;
    }
    
  })
  
  
})

Template.Admin.helpers({
  responses: function () {
    return Responses.find();
  },

  parseResponse: function (response) {
    return JSON.stringify(response);
  }
});

Template.Admin.events({
  "click .show-response-btn": function() {
    $('.response-block').show();
  },

  "click .download-response-btn": function (evt, template) {
    var date = Date()
    jsonToCSV(dataForCSV, date);
  }
});
