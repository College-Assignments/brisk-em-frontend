import React, { ReactNode } from 'react';

import EditTest from './edit';

export default function TestAction() {
  switch ('EDIT') {
    case 'EDIT':
      return (<EditTest />);
      break;
    default:
      break;
  }
}
