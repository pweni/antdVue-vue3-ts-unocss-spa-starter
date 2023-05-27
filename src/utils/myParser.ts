/**
 * Creates an array of elements split into groups the length of size. If collection can’t be split evenly, the
 * final chunk will be the remaining elements.
 *
 * @param mixed The string like [(1,2,3),(1,2,)] like python tuple in array.
 * @return Returns the how many tuples in the string.\
 * @example [(1,2,3),(1,2,)] ==> 2
 */
const getPythonArrMixTupleLength = (mixed: string): number => {
    mixed = mixed.replaceAll('(', '[')
    mixed = mixed.replaceAll(')', ']')
    let arrs = eval(mixed)
    return arrs.length
}
/**
 * Use rdkitjs to generate svg string with matched highlighted part in a mocule svg img.
 *
 * @param smarts The smarts pattern to match
 * @param inputSmiles the smiles user input
 * @return Returns the svg(s) of match pattern
 * @example ....
 */
const getMatchedSMARTSSvg = (smarts: string, inputSmiles: string): string => {
    let mol = window.RDKitModule.get_mol(inputSmiles)
    let qmol = window.RDKitModule.get_qmol(smarts)
    let mdetails = mol.get_substruct_match(qmol)
    let svg = mol.get_svg_with_highlights(mdetails)
    return svg
}
export { getPythonArrMixTupleLength, getMatchedSMARTSSvg }
