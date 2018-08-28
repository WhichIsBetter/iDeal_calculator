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
  if (Number.isInteger(input)) { //number is degree
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
    return bc.toFixed(2);
  }
  else {
    return null;
  }
}

//Generate Rx for print to text box
function generateRx(SPH,CYL,AXS) {
  if (SPH > 0) {
    SPH = "+"+SPH.toFixed(2);
  }
  if(CYL == 0) {
    return SPH.toFixed(2);
  }
  return SPH+"/"+CYL.toFixed(2)+"x"+AXS;
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
  "iDH_output":{
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

  //calculate flatK
  px.input.OD.FlatK = chooseFlatK(px.input.OD.K1,px.input.OD.K2);
  px.input.OS.FlatK = chooseFlatK(px.input.OS.K1,px.input.OS.K2);

  //calculate BC (iDH)
  px.iDH_output.OD.BC = iDH_BC(convertDmm(px.input.OD.FlatK));
  px.iDH_output.OS.BC = iDH_BC(convertDmm(px.input.OS.FlatK));

  //vertex SPH
  px.iDH_output.OD.SPH = convertVertex(px.input.vertex,px.input.OD.SPH);
  px.iDH_output.OD.SPH = Math.round(px.iDH_output.OD.SPH/0.25)*0.25;
  px.iDH_output.OD.SPH = px.iDH_output.OD.SPH.toFixed(2);
  px.iDH_output.OS.SPH = convertVertex(px.input.vertex,px.input.OS.SPH);
  px.iDH_output.OS.SPH = Math.round(px.iDH_output.OS.SPH/0.25)*0.25;
  px.iDH_output.OS.SPH = px.iDH_output.OS.SPH.toFixed(2);

  //vertex and calculate CYL
  px.iDH_output.OD.CYL = convertVertex(px.input.vertex,(px.input.OD.SPH+px.input.OD.CYL))-px.iDH_output.OD.SPH;
  px.iDH_output.OD.CYL = Math.round(px.iDH_output.OD.CYL/0.25)*0.25;
  px.iDH_output.OD.CYL = px.iDH_output.OD.CYL.toFixed(2);
  px.iDH_output.OS.CYL = convertVertex(px.input.vertex,(px.input.OS.SPH+px.input.OS.CYL))-px.iDH_output.OS.SPH;
  px.iDH_output.OS.CYL = Math.round(px.iDH_output.OS.CYL/0.25)*0.25;
  px.iDH_output.OS.CYL = px.iDH_output.OS.CYL.toFixed(2);

  // Adds axs
  px.iDH_output.OD.AXS = axsCleanUp(px.iDH_output.OD.CYL,px.input.OD.AXS);
  px.iDH_output.OS.AXS = axsCleanUp(px.iDH_output.OS.CYL,px.input.OS.AXS);

  //calculate HVID
  px.iDH_output.OD.DIA = Math.round((px.input.OD.HVID+2.5)/0.2)*0.2;
  px.iDH_output.OD.DIA = px.iDH_output.OD.DIA.toFixed(1);
  px.iDH_output.OS.DIA = Math.round((px.input.OS.HVID+2.5)/0.2)*0.2;
  px.iDH_output.OS.DIA = px.iDH_output.OS.DIA.toFixed(1);

  return px;
}
