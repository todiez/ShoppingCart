import { render, screen } from '@testing-library/react';
import App from './App';
import { api } from './api';

const mockCreateItem = (api.createItem = jest.fn());


test('add item to list', async () => {
  const cartText = "Apples";
  mockCreateItem.mockResolvedValueOnce(cartText);

  const {getByText, getByLabelText} = render(<App></App>);

  //enter content, interact with page
  const input = getByLabelText("Cart Contents");
  fireEvent.change(input, {target:{value:"Apples"}});
  fireEvent.click(getByText("$3 Apples - Stock: 10"));

  await wait(() => getByText("Apples"));

  //confirm data
  expect(mockCreateItem).toBeCalledTimes(1);
  expect(mockCreateItem).toBeCalledWith(
    expect.stringContaining("Apples")
  );


});
