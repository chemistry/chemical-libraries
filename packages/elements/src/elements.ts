/*
 * Covalent radii : http://dx.doi.org/10.1039/b801115j
 * van der Waals radii : http://dx.doi.org/10.1021/jp8111556
 * Atomic weight : http://www.degruyter.com/view/j/pac.2013.85.issue-5/pac-rep-13-03-02/pac-rep-13-03-02.xml
*/
export class Element {
    public static getElementById(id: number): Element {

        for (const elementName of Object.keys(ElementList)) {
            const element = ((ElementList as any)[elementName]) as Element;
            if (element.number === id) {
                return element;
            }
        }

        return null;
    }
    public static getElementByName(code: string): Element {
        const str = code.replace(/[^a-z]/gmi, "").toLowerCase();
        const f = str.charAt(0).toUpperCase() + str.slice(1);
        if (ElementList.hasOwnProperty(f)) {
            return ((ElementList as any)[f]) as Element;
        }
        return null;
    }

    public static getAllList(): Element[] {
        return Object.keys(ElementList)
          .filter((name) => {
              return name !== "Q" && name !== "D";
          })
          .map((name) => ElementList[name]);
    }
    /**
     * Symbol of Element
     */
    public symbol: string;
    /**
     * Element name
     */
    public name: string;
    /**
     * Element max Bonds
     */
    public maxBonds: number;
    /**
     * Position X in periodic Table
     */
    public posX: number;
    /**
     * Position Y in periodic Table
     */
    public posY: number;
    /**
     * Number in periodic table
     */
    public number: number;
    /**
     * Element mass
     */
    public mass: number;
    /**
     * Covalent Radius of element
     */
    public RCow: number;
    /**
     * van der Waals radius of the element
     */
    public RVdW: number;
    /**
     * Element representation color e.g. "#3050F8"
     */
    public color: string;
    /**
     * Element darc color representation
     */
    public color2: string;

    constructor(elementNumber: number, symbol: string, RCow: number, RVdW: number, maxBonds: number,
                mass: number, name: string, posX: number, posY: number, color: string, color2: string) {
        this.number = elementNumber;
        this.symbol = symbol;
        this.RCow = RCow;
        this.RVdW = RVdW;
        this.maxBonds = maxBonds;
        this.mass = mass;
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.color2 = color2;
    }
}
/* tslint:disable:object-literal-sort-keys */
const ElementList: {
  [name: string]: Element,
} =  {
        Q: new Element(0, "Q", 0.77, 0, 0, 0, "Dummy", 1, 7, "#FFFFFF", "#808080"),
        H: new Element(1, "H", 0.37, 1.2, 1, 1.00794, "Hydrogen", 1, 1, "#FFFFFF", "#808080"),
        D: new Element(1, "D", 0.37, 1.2, 1, 2, "Diyterium", 1, 8, "#FFFFFF", "#808080"),
        He: new Element(2, "He", 0.32, 1.4, 0, 4.002602, "Helium", 1, 18, "#D9FFFF", "#849B9B"),
        Li: new Element(3, "Li", 1.34, 2.2, 1, 6.941, "Lithium", 2, 1, "#CC80FF", "#C87EFA"),
        Be: new Element(4, "Be", 0.9, 1.9, 2, 9.012182, "Beryllium", 2, 2, "#C2FF00", "#82AB00"),
        B: new Element(5, "B", 0.82, 1.8, 3, 10.811, "Boron", 2, 13, "#FFB5B5", "#F090A0"),
        C: new Element(6, "C", 0.77, 1.7, 4, 12.0107, "Carbon", 2, 14, "#909090", "#000000"),
        N: new Element(7, "N", 0.75, 1.6, 4, 14.0067, "Nitrogen", 2, 15, "#3050F8", "#304FF7"),
        O: new Element(8, "O", 0.73, 1.55, 2, 15.9994, "Oxygen", 2, 16, "#FF0D0D", "#FF0D0D"),
        F: new Element(9, "F", 0.71, 1.5, 1, 18.9984032, "Fluorine", 2, 17, "#90E050", "#228B22"),
        Ne: new Element(10, "Ne", 0.69, 1.54, 0, 20.1797, "Neon", 2, 18, "#B3E3F5", "#7B9CA8"),
        Na: new Element(11, "Na", 1.54, 2.4, 1, 22.98977, "Sodium", 3, 1, "#AB5CF2", "#AB5CF2"),
        Mg: new Element(12, "Mg", 1.3, 2.2, 2, 24.305, "Magnesium", 3, 2, "#8AFF00", "#61B400"),
        Al: new Element(13, "Al", 1.18, 2.1, 6, 26.981538, "Aluminium", 3, 13, "#BFA6A6", "#A79191"),
        Si: new Element(14, "Si", 1.11, 2.1, 6, 28.0855, "Silicon", 3, 14, "#F0C8A0", "#B09276"),
        P: new Element(15, "P", 1.06, 1.95, 5, 30.973761, "Phosphorus", 3, 15, "#FF8000", "#FF8000"),
        S: new Element(16, "S", 1.02, 1.8, 6, 32.065, "Sulfur", 3, 16, "#FFFF30", "#FFC832"),
        Cl: new Element(17, "Cl", 0.99, 1.8, 1, 35.453, "Chlorine", 3, 17, "#1FF01F", "#1DC51D"),
        Ar: new Element(18, "Ar", 0.97, 1.88, 0, 39.948, "Argon", 3, 18, "#80D1E3", "#63A2B0"),
        K: new Element(19, "K", 1.96, 2.8, 1, 39.0983, "Potassium", 4, 1, "#8F40D4", "#8F40D4"),
        Ca: new Element(20, "Ca", 1.74, 2.4, 2, 40.078, "Calcium", 4, 2, "#3DFF00", "#2FC300"),
        Sc: new Element(21, "Sc", 1.44, 2.3, 6, 44.95591, "Scandium", 4, 3, "#E6E6E6", "#969696"),
        Ti: new Element(22, "Ti", 1.36, 2.15, 6, 47.867, "Titanium", 4, 4, "#BFC2C7", "#94969A"),
        V: new Element(23, "V", 1.25, 2.05, 6, 50.9415, "Vanadium", 4, 5, "#A6A6AB", "#96969A"),
        Cr: new Element(24, "Cr", 1.27, 2.05, 6, 51.9961, "Chromium", 4, 6, "#8A99C7", "#8796C3"),
        Mn: new Element(25, "Mn", 1.39, 2.05, 8, 54.938049, "Manganese", 4, 7, "#9C7AC7", "#9C7AC7"),
        Fe: new Element(26, "Fe", 1.25, 2.05, 6, 55.845, "Iron", 4, 8, "#E06633", "#E06633"),
        Co: new Element(27, "Co", 1.26, 2, 6, 58.9332, "Cobalt", 4, 9, "#F090A0", "#DB8293"),
        Ni: new Element(28, "Ni", 1.21, 2, 6, 58.6934, "Nickel", 4, 10, "#50D050", "#45B645"),
        Cu: new Element(29, "Cu", 1.38, 2, 6, 63.546, "Copper", 4, 11, "#C88033", "#C78033"),
        Zn: new Element(30, "Zn", 1.31, 2.1, 6, 65.409, "Zinc", 4, 12, "#7D80B0", "#7D80B0"),
        Ga: new Element(31, "Ga", 1.26, 2.1, 3, 69.723, "Gallium", 4, 13, "#C28F8F", "#BD8C8C"),
        Ge: new Element(32, "Ge", 1.22, 2.1, 4, 72.64, "Germanium", 4, 14, "#668F8F", "#668F8F"),
        As: new Element(33, "As", 1.19, 2.05, 3, 74.9216, "Arsenic", 4, 15, "#BD80E3", "#BD80E3"),
        Se: new Element(34, "Se", 1.16, 1.9, 2, 78.96, "Selenium", 4, 16, "#FFA100", "#E28F00"),
        Br: new Element(35, "Br", 1.14, 1.9, 1, 79.904, "Bromine", 4, 17, "#A62929", "#A62929"),
        Kr: new Element(36, "Kr", 1.1, 2.02, 0, 83.798, "Krypton", 4, 18, "#5CB8D1", "#53A6BC"),
        Rb: new Element(37, "Rb", 2.11, 2.9, 1, 85.4678, "Rubidium", 5, 1, "#702EB0", "#702EB0"),
        Sr: new Element(38, "Sr", 1.92, 2.55, 2, 87.62, "Strontium", 5, 2, "#00FF00", "#00D000"),
        Y: new Element(39, "Y", 1.62, 2.4, 6, 88.90585, "Yttrium", 5, 3, "#94FFFF", "#5FA4A4"),
        Zr: new Element(40, "Zr", 1.48, 2.3, 6, 91.224, "Zirconium", 5, 4, "#94E0E0", "#6BA2A2"),
        Nb: new Element(41, "Nb", 1.37, 2.15, 6, 92.90638, "Niobium", 5, 5, "#73C2C9", "#61A4A9"),
        Mo: new Element(42, "Mo", 1.45, 2.1, 6, 95.94, "Molybdenum", 5, 6, "#54B5B5", "#4EA9A9"),
        Tc: new Element(43, "Tc", 1.56, 2.05, 6, 98, "Technetium", 5, 7, "#3B9E9E", "#4EA9A9"),
        Ru: new Element(44, "Ru", 1.26, 2.05, 6, 101.07, "Ruthenium", 5, 8, "#248F8F", "#248F8F"),
        Rh: new Element(45, "Rh", 1.35, 2, 6, 102.9055, "Rhodium", 5, 9, "#0A7D8C", "#0A7D8C"),
        Pd: new Element(46, "Pd", 1.31, 2.05, 6, 106.42, "Palladium", 5, 10, "#006985", "#006985"),
        Ag: new Element(47, "Ag", 1.53, 2.1, 6, 107.8682, "Silver", 5, 11, "#C0C0C0", "#969696"),
        Cd: new Element(48, "Cd", 1.48, 2.2, 6, 112.411, "Cadmium", 5, 12, "#FFD98F", "#AE9462"),
        In: new Element(49, "In", 1.44, 2.2, 3, 114.818, "Indium", 5, 13, "#A67573", "#A67573"),
        Sn: new Element(50, "Sn", 1.41, 2.25, 4, 118.71, "Tin", 5, 14, "#668080", "#668080"),
        Sb: new Element(51, "Sb", 1.38, 2.2, 3, 121.76, "Antimony", 5, 15, "#9E63B5", "#9E63B5"),
        Te: new Element(52, "Te", 1.35, 2.1, 2, 127.6, "Tellurium", 5, 16, "#D47A00", "#D47A00"),
        I: new Element(53, "I", 1.33, 2.1, 1, 126.90447, "Iodine", 5, 17, "#940094", "#940094"),
        Xe: new Element(54, "Xe", 1.3, 2.16, 0, 131.293, "Xenon", 5, 18, "#429EB0", "#429EB0"),
        Cs: new Element(55, "Cs", 2.25, 3, 1, 132.90545, "Cesium", 6, 1, "#57178F", "#57178F"),
        Ba: new Element(56, "Ba", 1.98, 2.7, 2, 137.327, "Barium", 6, 2, "#00C900", "#00C900"),
        La: new Element(57, "La", 1.69, 2.5, 12, 138.9055, "Lanthanum", 9, 3, "#70D4FF", "#57A4C5"),
        Ce: new Element(58, "Ce", 1.6, 2.48, 6, 140.116, "Cerium", 9, 4, "#FFFFC7", "#989877"),
        Pr: new Element(59, "Pr", 1.6, 2.47, 6, 140.90765, "Praseodymium", 9, 5, "#D9FFC7", "#869D7B"),
        Nd: new Element(60, "Nd", 1.6, 2.45, 6, 144.24, "Neodymium", 9, 6, "#C7FFC7", "#7DA07D"),
        Pm: new Element(61, "Pm", 1.6, 2.43, 6, 145, "Promethium", 9, 7, "#A3FFC7", "#69A581"),
        Sm: new Element(62, "Sm", 1.6, 2.42, 6, 150.36, "Samarium", 9, 8, "#8FFFC7", "#5EA883"),
        Eu: new Element(63, "Eu", 1.6, 2.4, 6, 151.964, "Europium", 9, 9, "#61FFC7", "#43B089"),
        Gd: new Element(64, "Gd", 1.6, 2.38, 6, 157.25, "Gadolinium", 9, 10, "#45FFC7", "#31B48D"),
        Tb: new Element(65, "Tb", 1.6, 2.37, 6, 158.92534, "Terbium", 9, 11, "#30FFC7", "#23B890"),
        Dy: new Element(66, "Dy", 1.6, 2.35, 6, 162.5, "Dysprosium", 9, 12, "#1FFFC7", "#17BB92"),
        Ho: new Element(67, "Ho", 1.6, 2.33, 6, 164.93032, "Holmium", 9, 13, "#00FF9C", "#00C578"),
        Er: new Element(68, "Er", 1.6, 2.32, 6, 167.259, "Erbium", 9, 14, "#00E675", "#00C765"),
        Tm: new Element(69, "Tm", 1.6, 2.3, 6, 168.93421, "Thulium", 9, 15, "#00D452", "#00C94E"),
        Yb: new Element(70, "Yb", 1.6, 2.28, 6, 173.04, "Ytterbium", 9, 16, "#00BF38", "#00BF38"),
        Lu: new Element(71, "Lu", 1.6, 2.27, 6, 174.967, "Lutetium", 9, 17, "#00AB24", "#00AB24"),
        Hf: new Element(72, "Hf", 1.5, 2.25, 6, 178.49, "Hafnium", 6, 4, "#4DC2FF", "#42A8DC"),
        Ta: new Element(73, "Ta", 1.38, 2.2, 6, 180.9479, "Tantalum", 6, 5, "#4DA6FF", "#4BA2F9"),
        W: new Element(74, "W", 1.46, 2.1, 6, 183.84, "Tungsten", 6, 6, "#2194D6", "#2194D6"),
        Re: new Element(75, "Re", 1.59, 2.05, 6, 186.207, "Rhenium", 6, 7, "#267DAB", "#267DAB"),
        Os: new Element(76, "Os", 1.28, 2, 6, 190.23, "Osmium", 6, 8, "#266696", "#266696"),
        Ir: new Element(77, "Ir", 1.37, 2, 6, 192.217, "Iridium", 6, 9, "#175487", "#175487"),
        Pt: new Element(78, "Pt", 1.28, 2.05, 6, 195.078, "Platinum", 6, 10, "#D0D0E0", "#9595A0"),
        Au: new Element(79, "Au", 1.44, 2.1, 6, 196.96655, "Gold", 6, 11, "#FFD123", "#B9981A"),
        Hg: new Element(80, "Hg", 1.49, 2.05, 6, 200.59, "Mercury", 6, 12, "#B8B8D0", "#9595A9"),
        Tl: new Element(81, "Tl", 1.48, 2.2, 3, 204.3833, "Thallium", 6, 13, "#A6544D", "#A6544D"),
        Pb: new Element(82, "Pb", 1.47, 2.3, 4, 207.2, "Lead", 6, 14, "#575961", "#575961"),
        Bi: new Element(83, "Bi", 1.46, 2.3, 3, 208.98038, "Bismuth", 6, 15, "#9E4FB5", "#9E4FB5"),
        Po: new Element(84, "Po", 1.6, 2, 2, 209, "Polonium", 6, 16, "#AB5C00", "#AB5C00"),
        At: new Element(85, "At", 1.6, 2, 1, 210, "Astatine", 6, 17, "#754F45", "#754F45"),
        Rn: new Element(86, "Rn", 1.45, 2, 0, 222, "Radon", 6, 18, "#428296", "#428296"),
        Fr: new Element(87, "Fr", 1.6, 2, 1, 223, "Francium", 7, 1, "#420066", "#420066"),
        Ra: new Element(88, "Ra", 1.6, 2, 2, 226, "Radium", 7, 2, "#007D00", "#007D00"),
        Ac: new Element(89, "Ac", 1.6, 2, 6, 227, "Actinium", 10, 3, "#70ABFA", "#669CE4"),
        Th: new Element(90, "Th", 1.6, 2.4, 6, 232.0381, "Thorium", 10, 4, "#00BAFF", "#00B8FC"),
        Pa: new Element(91, "Pa", 1.6, 2, 6, 231.03588, "Protactinium", 10, 5, "#00A1FF", "#00A1FF"),
        U: new Element(92, "U", 1.6, 2.3, 6, 238.02891, "Uranium", 10, 6, "#008FFF", "#008FFF"),
        Np: new Element(93, "Np", 1.6, 2, 6, 237, "Neptunium", 10, 7, "#0080FF", "#0080FF"),
        Pu: new Element(94, "Pu", 1.6, 2, 6, 244, "Plutonium", 10, 8, "#006BFF", "#006BFF"),
        Am: new Element(95, "Am", 1.6, 2, 6, 243, "Americium", 10, 9, "#545CF2", "#545CF2"),
        Cm: new Element(96, "Cm", 1.6, 2, 6, 247, "Curium", 10, 10, "#785CE3", "#785CE3"),
        Bk: new Element(97, "Bk", 1.6, 2, 6, 247, "Berkelium", 10, 11, "#8A4FE3", "#8A4FE3"),
        Cf: new Element(98, "Cf", 1.6, 2, 6, 251, "Californium", 10, 12, "#A136D4", "#A136D4"),
        Es: new Element(99, "Es", 1.6, 2, 6, 252, "Einsteinium", 10, 13, "#B31FD4", "#B31FD4"),
        Fm: new Element(100, "Fm", 1.6, 2, 6, 257, "Fermium", 10, 14, "#B31FBA", "#B31FBA"),
        Md: new Element(101, "Md", 1.6, 2, 6, 258, "Mendelevium", 10, 15, "#B30DA6", "#B30DA6"),
        No: new Element(102, "No", 1.6, 2, 6, 259, "Nobelium", 10, 16, "#BD0D87", "#BD0D87"),
        Lr: new Element(103, "Lr", 1.6, 2, 6, 262, "Lawrencium", 10, 17, "#C70066", "#C70066"),
        Rf: new Element(104, "Rf", 1.6, 2, 6, 261, "Rutherfordium", 7, 4, "#CC0059", "#42A8DC"),
        Db: new Element(105, "Db", 1.6, 2, 6, 262, "Dubnium", 7, 5, "#D1004F", "#4BA2F9"),
        Sg: new Element(106, "Sg", 1.6, 2, 6, 266, "Seaborgium", 7, 6, "#D90045", "#2194D6"),
        Bh: new Element(107, "Bh", 1.6, 2, 6, 264, "Bohrium", 7, 7, "#E00038", "#267DAB"),
        Hs: new Element(108, "Hs", 1.6, 2, 6, 277, "Hassium", 7, 8, "#E6002E", "#266696"),
        Mt: new Element(109, "Mt", 1.6, 2, 6, 268, "Meitnerium", 7, 9, "#EB0026", "#175487"),
        Ds: new Element(110, "Ds", 1.6, 2, 6, 281, "Darmstadtium", 7, 10, "#FF1493", "#9595A0"),
        Rg: new Element(111, "Rg", 1.6, 2, 6, 272, "Roentgenium", 7, 11, "#FF1494", "#B9981A"),
        Cn: new Element(112, "Cb", 1.6, 2, 6, 277, "Copernicium", 7, 12, "#FF1495", "#9595A9"),
};
/* tslint:enable:object-literal-sort-keys */
