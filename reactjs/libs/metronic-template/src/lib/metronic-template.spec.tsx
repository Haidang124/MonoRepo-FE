import { render } from '@testing-library/react';

import MetronicTemplate from './metronic-template';

describe('MetronicTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MetronicTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
