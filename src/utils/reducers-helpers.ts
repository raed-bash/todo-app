type Item = { id: number };

type Meta = { total: number };

type PayloadMeta = { data: Item[]; meta: Meta };

type State = { items: Item[]; view: Item[]; total: number };

export class ReducersHelpers {
  static loadItems(state: State, { payload }: { payload: PayloadMeta }) {
    state.items = payload.data;
    state.total = payload.meta.total;
  }

  static loadItem(state: State, { payload }: { payload: Item }) {
    const view = state?.view;
    const itemId = payload.id;
    const itemIndex = view?.findIndex((item) => item?.id === itemId);
    if (itemIndex !== -1) {
      view[itemIndex] = payload;
    } else {
      view.push(payload);
    }
  }

  static addItem(state: State, { payload }: { payload: Item }) {
    state?.items.unshift(payload);
    state.total = state.total + 1;
  }

  static editItem(state: State, { payload }: { payload: Item }) {
    const itemId = payload?.id;
    const itemIndex = state.items.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) return void (state.items[itemIndex] = payload);
  }
}
