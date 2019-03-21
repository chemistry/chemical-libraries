/*
 * List Of chemical Elements: https://en.wikipedia.org/wiki/List_of_chemical_elements
 * Covalent radii : http://dx.doi.org/10.1039/b801115j
 * van der Waals radii : http://dx.doi.org/10.1021/jp8111556
 * Atomic weight : http://www.degruyter.com/view/j/pac.2013.85.issue-5/pac-rep-13-03-02/pac-rep-13-03-02.xml
*/
export interface ChemElementInfo {
  /**
   * Number in periodic table
   */
  id: number;
  /**
   * Symbol of Element
   */
  symbol: string;
  /**
   * Element name
   */
  name: string;
  /**
   * Element mass
   */
  mass: number;
  /**
   * Covalent Radius of element
   */
  RCow: number;
  /**
   * van der Waals radius of the element
   */
  RVdW: number;
  /**
   * Element max Bonds
   */
  maxBonds: number;
  /**
   * Element representation color e.g. "#3050F8"
   */
  color: string;
  /**
   * Element darc color representation
   */
  color2: string;
  /**
   * Position X in periodic Table
   */
  posX: number;
  /**
   * Position Y in periodic Table
   */
  posY: number;
}

/* tslint:disable:max-line-length */
export const ChemElementData: ChemElementInfo[] = [
  { id: 0, symbol: "Q", RCow: 0.77, RVdW: 0, maxBonds: 0, mass: 0, name: "Dummy", posX: 1, posY: 7, color: "#FFFFFF", color2: "#808080" },
  { id: 1, symbol: "H", RCow: 0.37, RVdW: 1.2, maxBonds: 1, mass: 1.00794, name: "Hydrogen", posX: 1, posY: 1, color: "#FFFFFF", color2: "#808080" },
  { id: 1, symbol: "D", RCow: 0.37, RVdW: 1.2, maxBonds: 1, mass: 2, name: "Diyterium", posX: 1, posY: 8, color: "#FFFFFF", color2: "#808080" },
  { id: 2, symbol: "He", RCow: 0.32, RVdW: 1.4, maxBonds: 0, mass: 4.002602, name: "Helium", posX: 1, posY: 18, color: "#D9FFFF", color2: "#849B9B" },
  { id: 3, symbol: "Li", RCow: 1.34, RVdW: 2.2, maxBonds: 1, mass: 6.941, name: "Lithium", posX: 2, posY: 1, color: "#CC80FF", color2: "#C87EFA" },
  { id: 4, symbol: "Be", RCow: 0.9, RVdW: 1.9, maxBonds: 2, mass: 9.012182, name: "Beryllium", posX: 2, posY: 2, color: "#C2FF00", color2: "#82AB00" },
  { id: 5, symbol: "B", RCow: 0.82, RVdW: 1.8, maxBonds: 3, mass: 10.811, name: "Boron", posX: 2, posY: 13, color: "#FFB5B5", color2: "#F090A0" },
  { id: 6, symbol: "C", RCow: 0.77, RVdW: 1.7, maxBonds: 4, mass: 12.0107, name: "Carbon", posX: 2, posY: 14, color: "#909090", color2: "#000000" },
  { id: 7, symbol: "N", RCow: 0.75, RVdW: 1.6, maxBonds: 4, mass: 14.0067, name: "Nitrogen", posX: 2, posY: 15, color: "#3050F8", color2: "#304FF7" },
  { id: 8, symbol: "O", RCow: 0.73, RVdW: 1.55, maxBonds: 2, mass: 15.9994, name: "Oxygen", posX: 2, posY: 16, color: "#FF0D0D", color2: "#FF0D0D" },
  { id: 9, symbol: "F", RCow: 0.71, RVdW: 1.5, maxBonds: 1, mass: 18.9984032, name: "Fluorine", posX: 2, posY: 17, color: "#90E050", color2: "#228B22" },
  { id: 10, symbol: "Ne", RCow: 0.69, RVdW: 1.54, maxBonds: 0, mass: 20.1797, name: "Neon", posX: 2, posY: 18, color: "#B3E3F5", color2: "#7B9CA8" },
  { id: 11, symbol: "Na", RCow: 1.54, RVdW: 2.4, maxBonds: 1, mass: 22.98977, name: "Sodium", posX: 3, posY: 1, color: "#AB5CF2", color2: "#AB5CF2" },
  { id: 12, symbol: "Mg", RCow: 1.3, RVdW: 2.2, maxBonds: 2, mass: 24.305, name: "Magnesium", posX: 3, posY: 2, color: "#8AFF00", color2: "#61B400" },
  { id: 13, symbol: "Al", RCow: 1.18, RVdW: 2.1, maxBonds: 6, mass: 26.981538, name: "Aluminium", posX: 3, posY: 13, color: "#BFA6A6", color2: "#A79191" },
  { id: 14, symbol: "Si", RCow: 1.11, RVdW: 2.1, maxBonds: 6, mass: 28.0855, name: "Silicon", posX: 3, posY: 14, color: "#F0C8A0", color2: "#B09276" },
  { id: 15, symbol: "P", RCow: 1.06, RVdW: 1.95, maxBonds: 5, mass: 30.973761, name: "Phosphorus", posX: 3, posY: 15, color: "#FF8000", color2: "#FF8000" },
  { id: 16, symbol: "S", RCow: 1.02, RVdW: 1.8, maxBonds: 6, mass: 32.065, name: "Sulfur", posX: 3, posY: 16, color: "#FFFF30", color2: "#FFC832" },
  { id: 17, symbol: "Cl", RCow: 0.99, RVdW: 1.8, maxBonds: 1, mass: 35.453, name: "Chlorine", posX: 3, posY: 17, color: "#1FF01F", color2: "#1DC51D" },
  { id: 18, symbol: "Ar", RCow: 0.97, RVdW: 1.88, maxBonds: 0, mass: 39.948, name: "Argon", posX: 3, posY: 18, color: "#80D1E3", color2: "#63A2B0" },
  { id: 19, symbol: "K", RCow: 1.96, RVdW: 2.8, maxBonds: 1, mass: 39.0983, name: "Potassium", posX: 4, posY: 1, color: "#8F40D4", color2: "#8F40D4" },
  { id: 20, symbol: "Ca", RCow: 1.74, RVdW: 2.4, maxBonds: 2, mass: 40.078, name: "Calcium", posX: 4, posY: 2, color: "#3DFF00", color2: "#2FC300" },
  { id: 21, symbol: "Sc", RCow: 1.44, RVdW: 2.3, maxBonds: 6, mass: 44.95591, name: "Scandium", posX: 4, posY: 3, color: "#E6E6E6", color2: "#969696" },
  { id: 22, symbol: "Ti", RCow: 1.36, RVdW: 2.15, maxBonds: 6, mass: 47.867, name: "Titanium", posX: 4, posY: 4, color: "#BFC2C7", color2: "#94969A" },
  { id: 23, symbol: "V", RCow: 1.25, RVdW: 2.05, maxBonds: 6, mass: 50.9415, name: "Vanadium", posX: 4, posY: 5, color: "#A6A6AB", color2: "#96969A" },
  { id: 24, symbol: "Cr", RCow: 1.27, RVdW: 2.05, maxBonds: 6, mass: 51.9961, name: "Chromium", posX: 4, posY: 6, color: "#8A99C7", color2: "#8796C3" },
  { id: 25, symbol: "Mn", RCow: 1.39, RVdW: 2.05, maxBonds: 8, mass: 54.938049, name: "Manganese", posX: 4, posY: 7, color: "#9C7AC7", color2: "#9C7AC7" },
  { id: 26, symbol: "Fe", RCow: 1.25, RVdW: 2.05, maxBonds: 6, mass: 55.845, name: "Iron", posX: 4, posY: 8, color: "#E06633", color2: "#E06633" },
  { id: 27, symbol: "Co", RCow: 1.26, RVdW: 2, maxBonds: 6, mass: 58.9332, name: "Cobalt", posX: 4, posY: 9, color: "#F090A0", color2: "#DB8293" },
  { id: 28, symbol: "Ni", RCow: 1.21, RVdW: 2, maxBonds: 6, mass: 58.6934, name: "Nickel", posX: 4, posY: 10, color: "#50D050", color2: "#45B645" },
  { id: 29, symbol: "Cu", RCow: 1.38, RVdW: 2, maxBonds: 6, mass: 63.546, name: "Copper", posX: 4, posY: 11, color: "#C88033", color2: "#C78033" },
  { id: 30, symbol: "Zn", RCow: 1.31, RVdW: 2.1, maxBonds: 6, mass: 65.409, name: "Zinc", posX: 4, posY: 12, color: "#7D80B0", color2: "#7D80B0" },
  { id: 31, symbol: "Ga", RCow: 1.26, RVdW: 2.1, maxBonds: 3, mass: 69.723, name: "Gallium", posX: 4, posY: 13, color: "#C28F8F", color2: "#BD8C8C" },
  { id: 32, symbol: "Ge", RCow: 1.22, RVdW: 2.1, maxBonds: 4, mass: 72.64, name: "Germanium", posX: 4, posY: 14, color: "#668F8F", color2: "#668F8F" },
  { id: 33, symbol: "As", RCow: 1.19, RVdW: 2.05, maxBonds: 3, mass: 74.9216, name: "Arsenic", posX: 4, posY: 15, color: "#BD80E3", color2: "#BD80E3" },
  { id: 34, symbol: "Se", RCow: 1.16, RVdW: 1.9, maxBonds: 2, mass: 78.96, name: "Selenium", posX: 4, posY: 16, color: "#FFA100", color2: "#E28F00" },
  { id: 35, symbol: "Br", RCow: 1.14, RVdW: 1.9, maxBonds: 1, mass: 79.904, name: "Bromine", posX: 4, posY: 17, color: "#A62929", color2: "#A62929" },
  { id: 36, symbol: "Kr", RCow: 1.1, RVdW: 2.02, maxBonds: 0, mass: 83.798, name: "Krypton", posX: 4, posY: 18, color: "#5CB8D1", color2: "#53A6BC" },
  { id: 37, symbol: "Rb", RCow: 2.11, RVdW: 2.9, maxBonds: 1, mass: 85.4678, name: "Rubidium", posX: 5, posY: 1, color: "#702EB0", color2: "#702EB0" },
  { id: 38, symbol: "Sr", RCow: 1.92, RVdW: 2.55, maxBonds: 2, mass: 87.62, name: "Strontium", posX: 5, posY: 2, color: "#00FF00", color2: "#00D000" },
  { id: 39, symbol: "Y", RCow: 1.62, RVdW: 2.4, maxBonds: 6, mass: 88.90585, name: "Yttrium", posX: 5, posY: 3, color: "#94FFFF", color2: "#5FA4A4" },
  { id: 40, symbol: "Zr", RCow: 1.48, RVdW: 2.3, maxBonds: 6, mass: 91.224, name: "Zirconium", posX: 5, posY: 4, color: "#94E0E0", color2: "#6BA2A2" },
  { id: 41, symbol: "Nb", RCow: 1.37, RVdW: 2.15, maxBonds: 6, mass: 92.90638, name: "Niobium", posX: 5, posY: 5, color: "#73C2C9", color2: "#61A4A9" },
  { id: 42, symbol: "Mo", RCow: 1.45, RVdW: 2.1, maxBonds: 6, mass: 95.94, name: "Molybdenum", posX: 5, posY: 6, color: "#54B5B5", color2: "#4EA9A9" },
  { id: 43, symbol: "Tc", RCow: 1.56, RVdW: 2.05, maxBonds: 6, mass: 98, name: "Technetium", posX: 5, posY: 7, color: "#3B9E9E", color2: "#4EA9A9" },
  { id: 44, symbol: "Ru", RCow: 1.26, RVdW: 2.05, maxBonds: 6, mass: 101.07, name: "Ruthenium", posX: 5, posY: 8, color: "#248F8F", color2: "#248F8F" },
  { id: 45, symbol: "Rh", RCow: 1.35, RVdW: 2, maxBonds: 6, mass: 102.9055, name: "Rhodium", posX: 5, posY: 9, color: "#0A7D8C", color2: "#0A7D8C" },
  { id: 46, symbol: "Pd", RCow: 1.31, RVdW: 2.05, maxBonds: 6, mass: 106.42, name: "Palladium", posX: 5, posY: 10, color: "#006985", color2: "#006985" },
  { id: 47, symbol: "Ag", RCow: 1.53, RVdW: 2.1, maxBonds: 6, mass: 107.8682, name: "Silver", posX: 5, posY: 11, color: "#C0C0C0", color2: "#969696" },
  { id: 48, symbol: "Cd", RCow: 1.48, RVdW: 2.2, maxBonds: 6, mass: 112.411, name: "Cadmium", posX: 5, posY: 12, color: "#FFD98F", color2: "#AE9462" },
  { id: 49, symbol: "In", RCow: 1.44, RVdW: 2.2, maxBonds: 3, mass: 114.818, name: "Indium", posX: 5, posY: 13, color: "#A67573", color2: "#A67573" },
  { id: 50, symbol: "Sn", RCow: 1.41, RVdW: 2.25, maxBonds: 4, mass: 118.71, name: "Tin", posX: 5, posY: 14, color: "#668080", color2: "#668080" },
  { id: 51, symbol: "Sb", RCow: 1.38, RVdW: 2.2, maxBonds: 3, mass: 121.76, name: "Antimony", posX: 5, posY: 15, color: "#9E63B5", color2: "#9E63B5" },
  { id: 52, symbol: "Te", RCow: 1.35, RVdW: 2.1, maxBonds: 2, mass: 127.6, name: "Tellurium", posX: 5, posY: 16, color: "#D47A00", color2: "#D47A00" },
  { id: 53, symbol: "I", RCow: 1.33, RVdW: 2.1, maxBonds: 1, mass: 126.90447, name: "Iodine", posX: 5, posY: 17, color: "#940094", color2: "#940094" },
  { id: 54, symbol: "Xe", RCow: 1.3, RVdW: 2.16, maxBonds: 0, mass: 131.293, name: "Xenon", posX: 5, posY: 18, color: "#429EB0", color2: "#429EB0" },
  { id: 55, symbol: "Cs", RCow: 2.25, RVdW: 3, maxBonds: 1, mass: 132.90545, name: "Cesium", posX: 6, posY: 1, color: "#57178F", color2: "#57178F" },
  { id: 56, symbol: "Ba", RCow: 1.98, RVdW: 2.7, maxBonds: 2, mass: 137.327, name: "Barium", posX: 6, posY: 2, color: "#00C900", color2: "#00C900" },
  { id: 57, symbol: "La", RCow: 1.69, RVdW: 2.5, maxBonds: 12, mass: 138.9055, name: "Lanthanum", posX: 9, posY: 3, color: "#70D4FF", color2: "#57A4C5" },
  { id: 58, symbol: "Ce", RCow: 1.6, RVdW: 2.48, maxBonds: 6, mass: 140.116, name: "Cerium", posX: 9, posY: 4, color: "#FFFFC7", color2: "#989877" },
  { id: 59, symbol: "Pr", RCow: 1.6, RVdW: 2.47, maxBonds: 6, mass: 140.90765, name: "Praseodymium", posX: 9, posY: 5, color: "#D9FFC7", color2: "#869D7B" },
  { id: 60, symbol: "Nd", RCow: 1.6, RVdW: 2.45, maxBonds: 6, mass: 144.24, name: "Neodymium", posX: 9, posY: 6, color: "#C7FFC7", color2: "#7DA07D" },
  { id: 61, symbol: "Pm", RCow: 1.6, RVdW: 2.43, maxBonds: 6, mass: 145, name: "Promethium", posX: 9, posY: 7, color: "#A3FFC7", color2: "#69A581" },
  { id: 62, symbol: "Sm", RCow: 1.6, RVdW: 2.42, maxBonds: 6, mass: 150.36, name: "Samarium", posX: 9, posY: 8, color: "#8FFFC7", color2: "#5EA883" },
  { id: 63, symbol: "Eu", RCow: 1.6, RVdW: 2.4, maxBonds: 6, mass: 151.964, name: "Europium", posX: 9, posY: 9, color: "#61FFC7", color2: "#43B089" },
  { id: 64, symbol: "Gd", RCow: 1.6, RVdW: 2.38, maxBonds: 6, mass: 157.25, name: "Gadolinium", posX: 9, posY: 10, color: "#45FFC7", color2: "#31B48D" },
  { id: 65, symbol: "Tb", RCow: 1.6, RVdW: 2.37, maxBonds: 6, mass: 158.92534, name: "Terbium", posX: 9, posY: 11, color: "#30FFC7", color2: "#23B890" },
  { id: 66, symbol: "Dy", RCow: 1.6, RVdW: 2.35, maxBonds: 6, mass: 162.5, name: "Dysprosium", posX: 9, posY: 12, color: "#1FFFC7", color2: "#17BB92" },
  { id: 67, symbol: "Ho", RCow: 1.6, RVdW: 2.33, maxBonds: 6, mass: 164.93032, name: "Holmium", posX: 9, posY: 13, color: "#00FF9C", color2: "#00C578" },
  { id: 68, symbol: "Er", RCow: 1.6, RVdW: 2.32, maxBonds: 6, mass: 167.259, name: "Erbium", posX: 9, posY: 14, color: "#00E675", color2: "#00C765" },
  { id: 69, symbol: "Tm", RCow: 1.6, RVdW: 2.3, maxBonds: 6, mass: 168.93421, name: "Thulium", posX: 9, posY: 15, color: "#00D452", color2: "#00C94E" },
  { id: 70, symbol: "Yb", RCow: 1.6, RVdW: 2.28, maxBonds: 6, mass: 173.04, name: "Ytterbium", posX: 9, posY: 16, color: "#00BF38", color2: "#00BF38" },
  { id: 71, symbol: "Lu", RCow: 1.6, RVdW: 2.27, maxBonds: 6, mass: 174.967, name: "Lutetium", posX: 9, posY: 17, color: "#00AB24", color2: "#00AB24" },
  { id: 72, symbol: "Hf", RCow: 1.5, RVdW: 2.25, maxBonds: 6, mass: 178.49, name: "Hafnium", posX: 6, posY: 4, color: "#4DC2FF", color2: "#42A8DC" },
  { id: 73, symbol: "Ta", RCow: 1.38, RVdW: 2.2, maxBonds: 6, mass: 180.9479, name: "Tantalum", posX: 6, posY: 5, color: "#4DA6FF", color2: "#4BA2F9" },
  { id: 74, symbol: "W", RCow: 1.46, RVdW: 2.1, maxBonds: 6, mass: 183.84, name: "Tungsten", posX: 6, posY: 6, color: "#2194D6", color2: "#2194D6" },
  { id: 75, symbol: "Re", RCow: 1.59, RVdW: 2.05, maxBonds: 6, mass: 186.207, name: "Rhenium", posX: 6, posY: 7, color: "#267DAB", color2: "#267DAB" },
  { id: 76, symbol: "Os", RCow: 1.28, RVdW: 2, maxBonds: 6, mass: 190.23, name: "Osmium", posX: 6, posY: 8, color: "#266696", color2: "#266696" },
  { id: 77, symbol: "Ir", RCow: 1.37, RVdW: 2, maxBonds: 6, mass: 192.217, name: "Iridium", posX: 6, posY: 9, color: "#175487", color2: "#175487" },
  { id: 78, symbol: "Pt", RCow: 1.28, RVdW: 2.05, maxBonds: 6, mass: 195.078, name: "Platinum", posX: 6, posY: 10, color: "#D0D0E0", color2: "#9595A0" },
  { id: 79, symbol: "Au", RCow: 1.44, RVdW: 2.1, maxBonds: 6, mass: 196.96655, name: "Gold", posX: 6, posY: 11, color: "#FFD123", color2: "#B9981A" },
  { id: 80, symbol: "Hg", RCow: 1.49, RVdW: 2.05, maxBonds: 6, mass: 200.59, name: "Mercury", posX: 6, posY: 12, color: "#B8B8D0", color2: "#9595A9" },
  { id: 81, symbol: "Tl", RCow: 1.48, RVdW: 2.2, maxBonds: 3, mass: 204.3833, name: "Thallium", posX: 6, posY: 13, color: "#A6544D", color2: "#A6544D" },
  { id: 82, symbol: "Pb", RCow: 1.47, RVdW: 2.3, maxBonds: 4, mass: 207.2, name: "Lead", posX: 6, posY: 14, color: "#575961", color2: "#575961" },
  { id: 83, symbol: "Bi", RCow: 1.46, RVdW: 2.3, maxBonds: 3, mass: 208.98038, name: "Bismuth", posX: 6, posY: 15, color: "#9E4FB5", color2: "#9E4FB5" },
  { id: 84, symbol: "Po", RCow: 1.6, RVdW: 2, maxBonds: 2, mass: 209, name: "Polonium", posX: 6, posY: 16, color: "#AB5C00", color2: "#AB5C00" },
  { id: 85, symbol: "At", RCow: 1.6, RVdW: 2, maxBonds: 1, mass: 210, name: "Astatine", posX: 6, posY: 17, color: "#754F45", color2: "#754F45" },
  { id: 86, symbol: "Rn", RCow: 1.45, RVdW: 2, maxBonds: 0, mass: 222, name: "Radon", posX: 6, posY: 18, color: "#428296", color2: "#428296" },
  { id: 87, symbol: "Fr", RCow: 1.6, RVdW: 2, maxBonds: 1, mass: 223, name: "Francium", posX: 7, posY: 1, color: "#420066", color2: "#420066" },
  { id: 88, symbol: "Ra", RCow: 1.6, RVdW: 2, maxBonds: 2, mass: 226, name: "Radium", posX: 7, posY: 2, color: "#007D00", color2: "#007D00" },
  { id: 89, symbol: "Ac", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 227, name: "Actinium", posX: 10, posY: 3, color: "#70ABFA", color2: "#669CE4" },
  { id: 90, symbol: "Th", RCow: 1.6, RVdW: 2.4, maxBonds: 6, mass: 232.0381, name: "Thorium", posX: 10, posY: 4, color: "#00BAFF", color2: "#00B8FC" },
  { id: 91, symbol: "Pa", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 231.03588, name: "Protactinium", posX: 10, posY: 5, color: "#00A1FF", color2: "#00A1FF" },
  { id: 92, symbol: "U", RCow: 1.6, RVdW: 2.3, maxBonds: 6, mass: 238.02891, name: "Uranium", posX: 10, posY: 6, color: "#008FFF", color2: "#008FFF" },
  { id: 93, symbol: "Np", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 237, name: "Neptunium", posX: 10, posY: 7, color: "#0080FF", color2: "#0080FF" },
  { id: 94, symbol: "Pu", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 244, name: "Plutonium", posX: 10, posY: 8, color: "#006BFF", color2: "#006BFF" },
  { id: 95, symbol: "Am", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 243, name: "Americium", posX: 10, posY: 9, color: "#545CF2", color2: "#545CF2" },
  { id: 96, symbol: "Cm", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 247, name: "Curium", posX: 10, posY: 10, color: "#785CE3", color2: "#785CE3" },
  { id: 97, symbol: "Bk", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 247, name: "Berkelium", posX: 10, posY: 11, color: "#8A4FE3", color2: "#8A4FE3" },
  { id: 98, symbol: "Cf", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 251, name: "Californium", posX: 10, posY: 12, color: "#A136D4", color2: "#A136D4" },
  { id: 99, symbol: "Es", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 252, name: "Einsteinium", posX: 10, posY: 13, color: "#B31FD4", color2: "#B31FD4" },
  { id: 100, symbol: "Fm", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 257, name: "Fermium", posX: 10, posY: 14, color: "#B31FBA", color2: "#B31FBA" },
  { id: 101, symbol: "Md", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 258, name: "Mendelevium", posX: 10, posY: 15, color: "#B30DA6", color2: "#B30DA6" },
  { id: 102, symbol: "No", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 259, name: "Nobelium", posX: 10, posY: 16, color: "#BD0D87", color2: "#BD0D87" },
  { id: 103, symbol: "Lr", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 262, name: "Lawrencium", posX: 10, posY: 17, color: "#C70066", color2: "#C70066" },
  { id: 104, symbol: "Rf", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 261, name: "Rutherfordium", posX: 7, posY: 4, color: "#CC0059", color2: "#42A8DC" },
  { id: 105, symbol: "Db", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 262, name: "Dubnium", posX: 7, posY: 5, color: "#D1004F", color2: "#4BA2F9" },
  { id: 106, symbol: "Sg", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 266, name: "Seaborgium", posX: 7, posY: 6, color: "#D90045", color2: "#2194D6" },
  { id: 107, symbol: "Bh", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 264, name: "Bohrium", posX: 7, posY: 7, color: "#E00038", color2: "#267DAB" },
  { id: 108, symbol: "Hs", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 277, name: "Hassium", posX: 7, posY: 8, color: "#E6002E", color2: "#266696" },
  { id: 109, symbol: "Mt", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 268, name: "Meitnerium", posX: 7, posY: 9, color: "#EB0026", color2: "#175487" },
  { id: 110, symbol: "Ds", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 281, name: "Darmstadtium", posX: 7, posY: 10, color: "#FF1493", color2: "#9595A0" },
  { id: 111, symbol: "Rg", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 272, name: "Roentgenium", posX: 7, posY: 11, color: "#FF1494", color2: "#B9981A" },
  { id: 112, symbol: "Cn", RCow: 1.6, RVdW: 2, maxBonds: 6, mass: 277, name: "Copernicium", posX: 7, posY: 12, color: "#FF1495", color2: "#9595A9" },
];
/* tslint:enable:max-line-length */
