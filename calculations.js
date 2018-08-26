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
      new value = convertDmm(input);
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
