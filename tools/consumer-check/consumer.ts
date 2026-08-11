// No tsconfig paths here on purpose: a NodeNext consumer must resolve through the published exports maps.
import { EPSILON } from '@chemistry/common';
import type { JNMol } from '@chemistry/common';
import { ChemElements } from '@chemistry/elements';
import type { ChemElementInfo } from '@chemistry/elements';
import { Formula } from '@chemistry/formula';
import type { ChemComposition } from '@chemistry/formula';
import { Quaternion, Vec3 } from '@chemistry/math';
import { defaultSvgOptions, exportToSVG, Molecule, MoleculeDataFormat } from '@chemistry/molecule';
import { CrystalSystem, SpaceGroup } from '@chemistry/space-groups';
import type { SpaceGroupInfo } from '@chemistry/space-groups';

const epsilon: number = EPSILON;

const carbon: ChemElementInfo | null = ChemElements.getBySymbol('C');
const symbols: string[] = ChemElements.getAllSymbols();

const water: ChemComposition = Formula.parse('H2O');
const weight: number = Formula.convertToWeight(water);

const axis: Vec3 = Vec3.cross(new Vec3(1, 0, 0), new Vec3(0, 1, 0));
const dot: number = Vec3.dot(axis, axis);
const rotation: Quaternion = new Quaternion(0, 0, 0, 1);

const data: JNMol = { id: 'm1', title: 'empty', atoms: {}, bonds: {} };
const molecule = new Molecule();
molecule.load(data, MoleculeDataFormat.jnmol);
const atomCount: number = molecule.getAtomCount();
const svg: string = exportToSVG(molecule.export(MoleculeDataFormat.jnmol), defaultSvgOptions);

const group: SpaceGroupInfo | null = SpaceGroup.getById(1);
const system: CrystalSystem | null = group ? SpaceGroup.getCrystalSystem(group) : null;

export const summary = {
  epsilon,
  carbon,
  symbols,
  weight,
  dot,
  rotation,
  atomCount,
  svg,
  group,
  system,
};
