import { screen } from '@testing-library/react';
import { GridTwoColum } from '.';
import { renderTheme } from '../../styles/render-theme';

describe('<GridTwoColum />', () => {
  it('should render', () => {
    renderTheme(<GridTwoColum>Children</GridTwoColum>);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
