let handler = async (m, { text }) => {
    if (!text) return m.reply('Masukkan Code ESM Yang Ingin Di Convert CJS.');

    try {
        const cjsCode = convertESMtoCJS(text);

        m.reply(`\n\n${cjsCode}`);
    } catch (error) {
        console.error('Error Convert Code ESM To CJS:', error);
        m.reply('Ada Yang Error Om, Cek Lagi Code nya.');
    }
};

function convertESMtoCJS(esmCode) {
    // Convert import statements to require
    let cjsCode = esmCode.replace(/import\s+([a-zA-Z0-9{},\s*]+)\s+from\s+['"](.*)['"];?/g, (match, imports, module) => {
        if (imports.includes("{")) {
            const [defaultImport, namedImports] = imports.split("{");
            let result = '';
            if (defaultImport.trim()) {
                result += `const ${defaultImport.trim()} = require('${module}');\n`;
            }
            if (namedImports) {
                result += `const { ${namedImports.replace("}", "").trim()} } = require('${module}');`;
            }
            return result;
        } else {
            return `const ${imports.trim()} = require('${module}');`;
        }
    });

    // Convert export default to module.exports
    cjsCode = cjsCode.replace(/export\s+default/g, 'module.exports =');

    // Convert export async function to exports.asyncFunction
    cjsCode = cjsCode.replace(/export\s+async\s+function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*{/g, 'exports.$1 = async function ($2) {');

    // Convert export function to exports.function
    cjsCode = cjsCode.replace(/export\s+function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*{/g, 'exports.$1 = function ($2) {');

    // Convert named exports (export const ...) to exports.<name>
    cjsCode = cjsCode.replace(/export\s+const\s+([a-zA-Z0-9_]+)\s+=/g, 'exports.$1 =');

    // Convert grouped export (export { ... }) to individual exports
    cjsCode = cjsCode.replace(/export\s*{\s*([^}]+)\s*};/g, (match, exportedVars) => {
        return exportedVars.split(',').map(variable => `exports.${variable.trim()} = ${variable.trim()};`).join('\n');
    });

    // Convert dynamic imports (import()) to require syntax
    cjsCode = cjsCode.replace(/import\((.*)\)/g, 'require($1)');

    return cjsCode;
}

handler.tags = ['tools'];
handler.command = ['convertcjs'];
handler.help = ['convertcjs'];
handler.limit = true;
module.exports = handler;