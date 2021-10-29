import { uiReducer } from "../../reducers/uiReducer";
import { uiOpenModal, uiCloseModal } from "../../actions/ui";

const initState = {
  modalOpen: false,
};

describe("Testing uiReducer", () => {
  test("should return default state", () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test("modal should be opened and closed", () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initState, modalOpen);

    expect(state).toEqual({ modalOpen: true });

    const modalClose = uiCloseModal();
    const stateClose = uiReducer(state, modalClose);

    expect(stateClose).toEqual({ modalOpen: false });
  });
});
