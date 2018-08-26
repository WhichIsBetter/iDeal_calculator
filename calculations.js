function defaultTemplate(flatK) {
  if (isNan(flatK) == false) {

  }
  else {
    return null
  }
}

function convertDmm(input) {
  //inputs mm and returns Dioptre n ViceVersa
  if (isNaN(input) == false ) {
    return 337.5/input;
  }
  else {
    return null;
  }
}

function mmOrDioptre(input) {
  //determines input is mm or dioptre and returns Dioptre
  if (isNan(input) == false) {
    if (input < 20) {
      // input is mm, convert to Diopter
      var value = convertDmm(input);
      return value;
    }
    else if (input > 100) {
      //power too high!!!
      return null;
    }
    else {
      // input is Diopter, return same
      return input;
    }
  }
  else {
    return null;
  }
}

function convertVertex(vertex,power) {
  // vertex(mm) conversion of power(Diopters)
  if (isNAN(vertex) == false && isNan(power) == false) {
    converted = power/(1-((vertex/1000)*power));
    return converted
  }
  else {
    return null;
  }
}

function iDH_BC(flatK) {
  //calculate iDealHydrogel BC
  if (isNan(flatK) == false) {
    var bc = (flatK*0.6)+3.5;
    bc = Math.round(bc/0.2)*0.2; //round to nearest 0.2mm
    return bc;
  }
  else {
    return null;
  }
}

var px = {
  "input":{
    "vertex":"",
    "OD":{
      "K1":"",
      "K2":"",
      "SPH":"",
      "CYL":"",
      "AXS":"",
      "HVID":""
    },
    "OS":{
      "K1":"",
      "K2":"",
      "SPH":"",
      "CYL":"",
      "AXS":"",
      "HVID":""
    }
  },
  "output":{
    "OD":{
      "BC":"",
      "SPH":"",
      "CYL":"",
      "AXS":"",
      "DIA":""
    },
    "OS":{
      "BC":"",
      "SPH":"",
      "CYL":"",
      "AXS":"",
      "DIA":""
    }
  }
};
