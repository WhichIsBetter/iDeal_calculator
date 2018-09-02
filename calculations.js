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

//determines input is deg or dioptre and returns Dioptre
function degOrDioptre(input) {
  input = Number(input);
  if (Number.isInteger(input) && Math.abs(input) > 99) { //number is degree
    return input/100;
  }
  else { //number is Diopter
    return input;
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

function axsCleanUp(cyl,axs) {
  if (Number(cyl) == 0 ) {
    return "";
  }
  else if  (Number(cyl) < 0 ) {
    if (Number(axs) == 0 ){
      return 180;
    }
    else if (Number(axs) < 180) {
      return axs
    }
    else {
      return axs;
    }
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
  else if (K1 <= K2) {
    return K1;
  }
  else {
    return K2;
  }
}

// vertex(mm) conversion of power(Diopters)
function convertVertex(vertex,power) {
  if (isNaN(vertex) == false && isNaN(power) == false) {
    var converted = power/(1-((vertex/1000)*power));
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
    return bc.toFixed(2);
  }
  else {
    return null;
  }
}

//Generate Rx for print to text box
function generateRx(SPH,CYL,AXS) {
  if (SPH > 0) {
    SPH = "+"+Number(SPH).toFixed(2);
  }
  if(CYL == 0) {
    return Number(SPH).toFixed(2);
  }
  return Number(SPH).toFixed(2)+"/"+Number(CYL).toFixed(2)+"x"+AXS;
}

//Generate Addition
function generateADD(add) {
    if (add < 0.75) {
      return 0;
    }
    else {
      return add + 0.5;
    }
}

//Generate KReadings print to text box
function generateKs(K1,K2) {
  if (K1 == null && K2 == null) {
    return "";
  }
  else if (K1 == null || K2 == null) {
      if (K1 == null) {
        return " "+K2.toFixed(2)+"mm, ";
      }
      else {
        return " "+K1.toFixed(2)+"mm, ";
      }
  }
  else {
    return " "+K1.toFixed(2)+"mm/"+K2.toFixed(2)+"mm, ";
  }
}

// px JSON
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
      "HVID":"",
      "ADD":""
    },
    "OS":{
      "K1":"",
      "K2":"",
      "FlatK":"",
      "SPH":"",
      "CYL":"",
      "AXS":"",
      "HVID":"",
      "ADD":""
    }
  },
  "iDH_output":{
    "OD":{
      "BC":"",
      "SPH":"",
      "CYL":"",
      "AXS":"",
      "DIA":"",
      "ADD":""
    },
    "OS":{
      "BC":"",
      "SPH":"",
      "CYL":"",
      "AXS":"",
      "DIA":"",
      "ADD":""
    }
  }
};

// Lens Limits
var lensLimits = {
  "iDH":{
    "DIA": {
      "MAX":16,
      "MIN":12
    },
    "BC": {
      "MAX":10,
      "MIN":5
    },
    "SPH": {
      "MAX":25,
      "MIN":-25
    },
    "ADD": {
      "MAX":4,
      "MIN":0.5
    },
    "CYL": {
      "MAX":-0.25,
      "MIN":-4
    },
    "AXS": {
      "MAX":180,
      "MIN":1
    },
    "ADD": {
      "MAX":4,
      "MIN":0.5
    }
  }
}

//adjust Output to within Range
function adjustToWithinRange(product,param,specToChk) {
  if (specToChk > lensLimits[product][param].MAX || specToChk < lensLimits[product][param].MIN) {
    if (specToChk > lensLimits[product][param].MAX) {
      return lensLimits[product][param].MAX;
    }
    else {
      return lensLimits[product][param].MIN;
    }
  }
  else {
    return specToChk;
  }
}

//calculate lens param for iDealHydrogel
//px is object
function iDH_Calc(px) {
  //data clean up
  px.input.OD.K1 = mmOrDioptre(px.input.OD.K1);
  px.input.OD.K2 = mmOrDioptre(px.input.OD.K2);
  px.input.OS.K1 = mmOrDioptre(px.input.OS.K1);
  px.input.OS.K2 = mmOrDioptre(px.input.OS.K2);

  //calculate flatK
  px.input.OD.FlatK = chooseFlatK(px.input.OD.K1,px.input.OD.K2);
  px.input.OS.FlatK = chooseFlatK(px.input.OS.K1,px.input.OS.K2);

  //calculate BC (iDH)
  px.iDH_output.OD.BC = iDH_BC(convertDmm(px.input.OD.FlatK));
  px.iDH_output.OS.BC = iDH_BC(convertDmm(px.input.OS.FlatK));
  px.iDH_output.OD.BC = adjustToWithinRange("iDH","BC",px.iDH_output.OD.BC);
  px.iDH_output.OS.BC = adjustToWithinRange("iDH","BC",px.iDH_output.OS.BC);

  //vertex SPH
  px.iDH_output.OD.SPH = convertVertex(px.input.vertex,px.input.OD.SPH);
  px.iDH_output.OD.SPH = Math.round(px.iDH_output.OD.SPH/0.25)*0.25;
  px.iDH_output.OD.SPH = px.iDH_output.OD.SPH.toFixed(2);
  px.iDH_output.OS.SPH = convertVertex(px.input.vertex,px.input.OS.SPH);
  px.iDH_output.OS.SPH = Math.round(px.iDH_output.OS.SPH/0.25)*0.25;
  px.iDH_output.OS.SPH = px.iDH_output.OS.SPH.toFixed(2);
  px.iDH_output.OD.SPH = adjustToWithinRange("iDH","SPH",px.iDH_output.OD.SPH);
  px.iDH_output.OS.SPH = adjustToWithinRange("iDH","SPH",px.iDH_output.OS.SPH);


  //vertex and calculate CYL
  px.iDH_output.OD.CYL = convertVertex(px.input.vertex,(px.input.OD.SPH+px.input.OD.CYL))-px.iDH_output.OD.SPH;
  px.iDH_output.OD.CYL = Math.round(px.iDH_output.OD.CYL/0.25)*0.25;
  px.iDH_output.OD.CYL = px.iDH_output.OD.CYL.toFixed(2);
  px.iDH_output.OS.CYL = convertVertex(px.input.vertex,(px.input.OS.SPH+px.input.OS.CYL))-px.iDH_output.OS.SPH;
  px.iDH_output.OS.CYL = Math.round(px.iDH_output.OS.CYL/0.25)*0.25;
  px.iDH_output.OS.CYL = px.iDH_output.OS.CYL.toFixed(2);
  if (px.iDH_output.OD.CYL <= -0.75) {
      px.iDH_output.OD.CYL = adjustToWithinRange("iDH","CYL",px.iDH_output.OD.CYL);
  }
  if (px.iDH_output.OS.CYL <= -0.75) {
      px.iDH_output.OS.CYL = adjustToWithinRange("iDH","CYL",px.iDH_output.OS.CYL);
  }

  // Adds axs
  px.iDH_output.OD.AXS = axsCleanUp(px.iDH_output.OD.CYL,px.input.OD.AXS);
  px.iDH_output.OS.AXS = axsCleanUp(px.iDH_output.OS.CYL,px.input.OS.AXS);
  px.iDH_output.OD.AXS = adjustToWithinRange("iDH","AXS",px.iDH_output.OD.AXS);
  px.iDH_output.OS.AXS = adjustToWithinRange("iDH","AXS",px.iDH_output.OS.AXS);

  //calculate DIA
  px.iDH_output.OD.DIA = Math.round((px.input.OD.HVID+2.5)/0.2)*0.2;
  px.iDH_output.OD.DIA = px.iDH_output.OD.DIA.toFixed(1);
  px.iDH_output.OS.DIA = Math.round((px.input.OS.HVID+2.5)/0.2)*0.2;
  px.iDH_output.OS.DIA = px.iDH_output.OS.DIA.toFixed(1);
  px.iDH_output.OD.DIA = adjustToWithinRange("iDH","DIA",px.iDH_output.OD.DIA);
  px.iDH_output.OS.DIA = adjustToWithinRange("iDH","DIA",px.iDH_output.OS.DIA);

  //calculate Addition
  px.iDH_output.OD.ADD = Math.round(generateADD(px.input.OD.ADD)/0.25)*0.25;
  px.iDH_output.OD.ADD = px.iDH_output.OD.ADD.toFixed(2);
  px.iDH_output.OS.ADD = Math.round(generateADD(px.input.OS.ADD)/0.25)*0.25;
  px.iDH_output.OS.ADD = px.iDH_output.OS.ADD.toFixed(2);
  if (px.iDH_output.OD.ADD >= 0.75) {
    px.iDH_output.OD.ADD = adjustToWithinRange("iDH","ADD",px.iDH_output.OD.ADD);
  }
  if (px.iDH_output.OS.ADD >= 0.75) {
    px.iDH_output.OS.ADD = adjustToWithinRange("iDH","ADD",px.iDH_output.OS.ADD);
  }
  return px;
}
