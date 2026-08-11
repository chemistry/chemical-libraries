import { exportToSVG } from './index.js';
import { MoleculeDataFormat } from './models.js';
import { Molecule } from './molecule.js';

const ACETONE = {
  id: '3',
  title: 'acetone',
  atoms: {
    'atom:1': { x: -0.7145, y: -0.4125, z: 0, type: 'C' },
    'atom:2': { x: 0, y: 0, z: 0, type: 'C' },
    'atom:3': { x: 0.7145, y: -0.4125, z: 0, type: 'C' },
    'atom:4': { x: 0, y: 0.825, z: 0, type: 'O' },
  },
  bonds: {
    'bond:1': { atom1: 'atom:1', atom2: 'atom:2', order: 1 },
    'bond:2': { atom1: 'atom:2', atom2: 'atom:3', order: 1 },
    'bond:3': { atom1: 'atom:2', atom2: 'atom:4', order: 2 },
  },
};

const LABELLED_ATOM = { x: 0, y: 0, z: 0, type: 'Zz&<>"\'' };

describe('Molecule', () => {
  let sut: Molecule;

  it('should export class definition', () => {
    expect(Molecule).toBeDefined();
  });

  beforeEach(() => {
    sut = new Molecule();
  });

  it('should be able to create instance', () => {
    expect(sut).toBeDefined();
  });

  describe('JNMol', () => {
    it('should return empty JNMol for new molecule', () => {
      const mol = new Molecule();
      const res = mol.export(MoleculeDataFormat.jnmol);
      expect(res).toEqual({ id: '', title: '', atoms: {}, bonds: {} });
    });
  });

  describe('getAtomCount', () => {
    it('should be able to get atomCount', () => {
      const atomCount = sut.getAtomCount();
      expect(atomCount).toEqual(0);
    });
  });

  describe('getBondCount', () => {
    it('should be able to get getBondCount', () => {
      const bondCount = sut.getBondCount();
      expect(bondCount).toEqual(0);
    });
  });

  describe('load', () => {
    it('should be able to load molecule', () => {
      sut.load(ACETONE, MoleculeDataFormat.jnmol);
      expect(sut.getAtomCount()).toEqual(4);
      expect(sut.getBondCount()).toEqual(3);
    });

    it('should throw for incorrect data format', () => {
      expect(() => {
        sut.load(ACETONE, 'unknown-format' as any);
      }).toThrow();
    });

    it('should throw when title is missing in jnmol format', () => {
      expect(() => {
        sut.load({}, MoleculeDataFormat.jnmol);
      }).toThrow();
    });
  });

  describe('noActions', () => {
    it('should ignore unknown actions', () => {
      const state1 = (sut as any).state;
      (sut as any).store.dispatch({ type: 'UNKNOWN ACTION ' });
      const state2 = (sut as any).state;

      expect(state1).toBe(state2);
    });
  });

  describe('toSVG', () => {
    beforeEach(() => {
      sut.load(ACETONE, MoleculeDataFormat.jnmol);
    });

    it('should export ACETONE as an svg string', async () => {
      const svg = await sut.toSVG({});

      expect(typeof svg).toBe('string');
      expect(svg.startsWith('<svg class="c-molsvg">')).toBe(true);
      expect(svg.endsWith('</g></svg>')).toBe(true);
    });

    it('should inline the default styles', async () => {
      const svg = await sut.toSVG({});

      expect(svg).toContain('<style>');
      expect(svg).toContain('.c-molsvg text {');
      expect(svg).toContain('font-size: 14;');
      expect(svg).toContain('line-height: 14;');
      expect(svg).toContain('font-family: Helvetica, Arial, sans-serif;');
    });

    it('should take drawing options into account', async () => {
      const svg = await sut.toSVG({ fontSize: 22, fontFamily: 'Courier' });

      expect(svg).toContain('font-size: 22;');
      expect(svg).toContain('font-family: Courier;');
    });

    it('should render one projected text node per atom', async () => {
      const svg = await sut.toSVG({});

      expect(svg.match(/<text /g)).toHaveLength(4);
      expect(svg).toContain(
        '<text x="121.42" y="33.5" fill="#000000" text-anchor="middle" alignment-baseline="middle">C</text>'
      );
      expect(svg).toContain(
        '<text x="150" y="83" fill="#FF0D0D" text-anchor="middle" alignment-baseline="middle">O</text>'
      );
    });

    it('should color atoms black when colorElements is off', async () => {
      const svg = await sut.toSVG({ colorElements: false });

      expect(svg.match(/fill="black"/g)).toHaveLength(4);
      expect(svg).not.toContain('#FF0D0D');
    });

    it('should xml-escape atom labels', async () => {
      sut.load({ ...ACETONE, atoms: { 'atom:1': LABELLED_ATOM } }, MoleculeDataFormat.jnmol);
      const svg = await sut.toSVG({});

      expect(svg).toContain('>Zz&amp;&lt;&gt;&quot;&#39;</text>');
      expect(svg).not.toContain(LABELLED_ATOM.type);
      expect(svg).toContain('fill="black"');
    });
  });

  describe('exportToSVG', () => {
    it('should be exported from the package barrel', () => {
      expect(typeof exportToSVG).toBe('function');
    });

    it('should export a molecule state without a Molecule instance', () => {
      const svg = exportToSVG(ACETONE, { colorElements: false });

      expect(svg.startsWith('<svg class="c-molsvg">')).toBe(true);
      expect(svg.match(/fill="black"/g)).toHaveLength(4);
    });
  });
});
