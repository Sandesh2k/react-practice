import { memo, type CSSProperties } from 'react'
import type { Item } from './data'

export type RowProps = {
  item: Item
  onSelect: (id: number) => void
  selected: boolean
  style?: CSSProperties
}

function ItemRow({ item, onSelect, selected, style }: RowProps) {
  return (
    <div
      style={style}
      className={`item-row ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(item.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onSelect(item.id)
      }}
    >
      <div>
        <strong>{item.name}</strong>
        <p>{item.description}</p>
      </div>
      <span className="item-id">#{item.id}</span>
    </div>
  )
}

export const MemoItemRow = memo(ItemRow)
export default ItemRow
