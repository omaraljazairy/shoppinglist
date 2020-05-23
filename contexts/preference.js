/**
 * loads the user preference from the storage
 * and shares it with the rest of the app.
 * @author Omar Aljazairy
 * @version 1.0
 */

import React from 'react';

export const PreferenceContext = React.createContext({
  language: 'es',
});
