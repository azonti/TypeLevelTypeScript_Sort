// Bool: Truth values
type Bool = True | False
type True = "t"
type False = "f"

// Nat: Natural numbers
type Nat = _0 | Suc_Nat
interface Suc_Nat extends Suc<Nat> {}
type _0 = { is0: True }
type Suc<N extends Nat> = { is0: False; pre: N }

// is0: Is N 0?
type is0<N extends Nat> = N["is0"]

// LE: Is N less than or equal to M?
type LE<N extends Nat, M extends Nat> =
  N extends Suc<infer Pre_N> ? M extends Suc<infer Pre_M> ?
  { f: LE<Pre_N, Pre_M> }[is0<M>] : False : True


// Lst: List of natural numbers
type Lst = MTLst | Cons_Nat_Lst
interface Cons_Nat_Lst extends Cons<Nat, Lst> {}
type MTLst = { isMT: True }
type Cons<N extends Nat, L extends Lst> = { isMT: False; fst: N; rst: L }

// isMT: Is L empty?
type isMT<L extends Lst> = L["isMT"]

// Ins: Insert N into L in order
type Ins<N extends Nat, L extends Lst> =
  L extends Cons<infer Fst_L, infer Rst_L> ? LE<N, Fst_L> extends False ?
  { f: Cons<Fst_L, Ins<N, Rst_L>> }[isMT<L>] : Cons<N, L> : Cons<N, L>

// Sort: Sort L
type Sort<L extends Lst> =
  L extends Cons<infer Fst_L, infer Rst_L> ? { f: Ins<Fst_L, Sort<Rst_L>> }[isMT<L>] : L

type _1 = Suc<_0>
type _2 = Suc<_1>
type _3 = Suc<_2>
type _4 = Suc<_3>
type _5 = Suc<_4>

type Unsorted = Cons<_1, Cons<_0, Cons<_5, Cons<_2, Cons<_4, Cons<_3, MTLst>>>>>>
const a: Sort<Unsorted> = "Look at error! It is sorted!"
