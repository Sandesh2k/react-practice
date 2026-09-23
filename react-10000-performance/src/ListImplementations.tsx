import { useCallback, useState } from 'react'
import { FixedSizeList, type ListChildComponentProps } from 'react-window'
import { ITEMS, type Item } from './data'
import ItemRow, { MemoItemRow } from './ItemRow'

export type Mode = 'baseline' | 'memo' | 'memo-callback' | 'windowed'

type CommonProps = {
  tick: number
  onSelect: (id: number) => void
  selectedId: number | null
}

function BaselineList({ onSelect, selectedId }: CommonProps) {
  return (
    <div className="list">
      {ITEMS.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={(id) => onSelect(id)}
        />
      ))}
    </div>
  )
}

function MemoList({ onSelect, selectedId }: CommonProps) {
  return (
    <div className="list">
      {ITEMS.map((item) => (
        <MemoItemRow
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={(id) => onSelect(id)}
        />
      ))}
    </div>
  )
}

function MemoCallbackList({ onSelect, selectedId }: CommonProps) {
  const handleSelect = useCallback((id: number) => onSelect(id), [onSelect])

  return (
    <div className="list">
      {ITEMS.map((item) => (
        <MemoItemRow
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}

type WindowedRowData = {
  items: Item[]
  selectedId: number | null
  onSelect: (id: number) => void
}

const WindowedRow = ({ index, style, data }: ListChildComponentProps<WindowedRowData>) => {
  const item = data.items[index]

  return (
    <MemoItemRow
      item={item}
      selected={item.id === data.selectedId}
      onSelect={data.onSelect}
      style={style}
    />
  )
}

function WindowedList({ onSelect, selectedId }: CommonProps) {
  const handleSelect = useCallback((id: number) => onSelect(id), [onSelect])

  return (
    <FixedSizeList
      className="windowed-list"
      height={600}
      width="100%"
      itemCount={ITEMS.length}
      itemSize={76}
      itemData={{ items: ITEMS, selectedId, onSelect: handleSelect }}
    >
      {WindowedRow}
    </FixedSizeList>
  )
}

export function PerformanceList(props: CommonProps & { mode: Mode }) {
  switch (props.mode) {
    case 'baseline':
      return <BaselineList {...props} />
    case 'memo':
      return <MemoList {...props} />
    case 'memo-callback':
      return <MemoCallbackList {...props} />
    case 'windowed':
      return <WindowedList {...props} />
  }
}

export function useSelection() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [tick, setTick] = useState(0)

  const onSelect = useCallback((id: number) => {
    setSelectedId(id)
  }, [])

  const triggerParentRender = () => setTick((value) => value + 1)

  return { selectedId, onSelect, tick, triggerParentRender }
}
