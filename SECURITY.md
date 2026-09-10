# Security Policy

## Vulnerability Status

### ✅ Fixed Vulnerabilities

#### 1. bn.js Infinite Loop (GHSA-378v-28hj-76wf) - FIXED
**Severity**: Moderate
**Status**: ✅ Resolved
**Fix**: Added npm overrides to ensure bn.js >= 4.12.3 or >= 5.2.3

#### 2. yargs-parser Prototype Pollution (GHSA-p9pc-299p-vxgp) - FIXED
**Severity**: Moderate
**Status**: ✅ Resolved
**Fix**: Updated babel-minify to 0.6.0-alpha.9 which uses secure yargs-parser version

#### 3. brace-expansion DoS (GHSA-3jxr-9vmj-r5cp, GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895) - FIXED
**Severity**: High
**Status**: ✅ Resolved
**Fix**: Updated brace-expansion to 1.1.18 in root (PR #51) and to 5.0.9 in /demo (PR #52)

#### 4. browserslist OOM + Prototype Write (GHSA-c83g-rgw3-j3cx, GHSA-73wf-gq98-2v4g) - FIXED
**Severity**: High
**Status**: ✅ Resolved
**Fix**: Updated browserslist to 4.28.9 in root (PR #56) and 4.28.8 in /demo (PR #55)

#### 5. shell-quote Quadratic DoS (GHSA-395f-4hp3-45gv) - FIXED
**Severity**: High
**Status**: ✅ Resolved
**Fix**: Updated shell-quote to 1.10.0 (PR #50)

#### 6. baseline-browser-mapping process.exit DoS (GHSA-w5vr-8v7q-w6rv / CVE-2026-45819) - FIXED
**Severity**: Moderate
**Status**: ✅ Resolved
**Fix**: Updated baseline-browser-mapping to 2.11.21 (PR #57)

### ⚠️ Known Vulnerabilities (Awaiting Upstream Fix)

#### 1. Elliptic Cryptographic Primitive Issue (GHSA-848j-6mx2-7j84)

**Status**: Awaiting upstream fix
**Severity**: Low
**Published**: January 8, 2026
**Affected Package**: `elliptic@6.6.1` (transitive dependency via `browserify`)

##### Description
The elliptic package uses a cryptographic primitive with a risky implementation. This is a transitive dependency introduced through:
- `browserify@17.0.1` → `crypto-browserify` → `elliptic@6.6.1`

##### Current Mitigation
- ✅ Updated `browserify` to the latest version (17.0.1)
- ✅ Added npm overrides configuration in `package.json` to automatically use newer versions when available
- ✅ Monitoring the elliptic repository for security patches

##### Next Steps
There is no patched version of elliptic available in the npm registry as of the latest audit. Once a patched version (6.6.2 or later) is released, run:

```bash
npm install
```

The overrides configuration will automatically use the newer, patched version.

##### Risk Assessment
This is classified as a **LOW severity** vulnerability. The risk is minimal for this SDK as:
1. The SDK is used in browser environments
2. The cryptographic functions are used by browserify's build-time bundling process
3. No direct cryptographic operations are exposed to end users

#### 2. qs Array-limit Bypass + DoS (GHSA-x5fp-wj9c-mxmx, GHSA-4mjr-xmp4-gh2g)

**Status**: Awaiting upstream fix in `browserify`
**Severity**: Moderate
**Published**: 2025–2026
**Affected Package**: `qs@6.15.2` (transitive dependency via `browserify` → `url`)

##### Description
The qs package has two vulnerabilities: an array-limit bypass via bracket-key comma parsing, and a denial of service via an attacker-controlled `isBuffer` check. This is a transitive dependency introduced through:
- `browserify@17.0.1` → `url@0.11.4` → `qs@6.15.2`

##### Current Mitigation
- ✅ Monitoring the `browserify` and `url` packages for updates that pull in qs >= 6.16.0
- ✅ The vulnerability is in a build-time bundling tool, not in the distributed browser SDK

##### Risk Assessment
This is classified as **MODERATE severity** but has minimal real-world impact for this SDK as `qs` is used by `browserify`'s internal `url` module at build time only — it is not included in the published browser bundle.

## Package Overrides Configuration

The following npm overrides are configured in `package.json` to ensure secure versions:

```json
"overrides": {
  "elliptic": ">=6.6.1",
  "bn.js": "^4.12.3 || ^5.2.3",
  "yargs-parser": "~21.1.1",
  "@babel/helpers": ">=7.29.0"
}
```

## Reporting Security Issues

If you discover a security vulnerability in this project, please report it to verify@au1.ibm.com.
