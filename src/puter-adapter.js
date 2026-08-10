// puter-adapter.js
// Safe initialization wrapper for Puter.js
// The @heyputer/puter.js package exports an already-initialized `puter` singleton,
// not a `Puter` class. We import it directly and re-export for convenience.

import puter from "@heyputer/puter.js";

// Re-export the singleton instance so the rest of the app can use it
export default puter;
