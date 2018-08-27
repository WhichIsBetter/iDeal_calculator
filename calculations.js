//dafault
function defaultTemplate(flatK) {
  if (isNaN(flatK) == false) {

  }
  else {
    return null
  }
}

//inputs mm and returns Dioptre n ViceVersa
function convertDmm(input) {
  if (isNaN(input) == false ) {
    return 337.5/input;
  }
  else {
    return null;
  }
}

//determines input is mm or dioptre and returns Dioptre
function mmOrDioptre(input) {
  if (isNaN(input) == false) {
    if (input == "") {
      return null;
    }
    else if (input < 20) {
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

// decide FlatK -- K1/K2 must be in Dioptres
function chooseFlatK(K1,K2) {
  if (K1 == null && K2 == null) {
    return null;
  }
  else if(K1 == null) {
    return K2;
  }
  else if(K2 == null){
    return K1;
  }
  else {
    Math.min(K1, K2);
  }
}

// vertex(mm) conversion of power(Diopters)
function convertVertex(vertex,power) {
  if (isNAN(vertex) == false && isNaN(power) == false) {
    converted = power/(1-((vertex/1000)*power));
    return converted
  }
  else {
    return null;
  }
}

//calculate iDealHydrogel BC -- flatK must be in mm
function iDH_BC(flatK) {
  if (isNaN(flatK) == false) {
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
      "FlatK":"",
      "SPH":"",
      "CYL":"",
      "AXS":"",
      "HVID":""
    },
    "OS":{
      "K1":"",
      "K2":"",
      "FlatK":"",
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

//calculate lens param for iDealHydrogel
//px is object
function iDH_Calc(px) {
  //data clean up
  px.input.OD.K1 = mmOrDioptre(px.input.OD.K1);
  px.input.OD.K2 = mmOrDioptre(px.input.OD.K2);
  px.input.OS.K1 = mmOrDioptre(px.input.OS.K1);
  px.input.OS.K2 = mmOrDioptre(px.input.OS.K2);

  px.input.OD.FlatK = chooseFlatK(px.input.OD.K1,px.input.OD.K2);
  px.input.OS.FlatK = chooseFlatK(px.input.OS.K1,px.input.OS.K2);

  //ODflatK = max()
  //px.output.OD.BC =
  return px;
}
