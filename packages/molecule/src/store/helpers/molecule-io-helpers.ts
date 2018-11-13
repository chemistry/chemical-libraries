export function isValidJnmol(data: any): boolean {
    if (
      !data || typeof data !== "object" ||
      !data.atoms || !data.bonds ||
      typeof data.id !== "string" ||
      typeof data.title !== "string"
    )  {
       return false;
    }

    return true;
}
