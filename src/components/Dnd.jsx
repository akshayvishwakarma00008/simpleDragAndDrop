import { useState } from "react";

// import "./Dnd.scss"
const Dnd = () => {
  const group = [
    { id: "g1", value: "Group1" },
    { id: "g2", value: "Group2" },
  ];
  const [items, setItems] = useState([
    { id: 1, group: "g1", value: "item 1 G1" },
    { id: 2, group: "g1", value: "item 2 G1" },
    { id: 3, group: "g1", value: "item 3 G1" },
    { id: 4, group: "g2", value: "item 1 G2" },
    { id: 5, group: "g2", value: "item 2 G2" },
    { id: 6, group: "g2", value: "item 3 G2" },
  ]);

  const [dragId, setDragId] = useState();

  const handleDragStart = (item) => {
    setDragId(item);
  };

  const handleDrop = (targetGroupId, targetItemId = null) => {
    if (!dragId) return;

    console.log("targetGroupId: ", targetGroupId);
    console.log("targetItemId: ", targetItemId);
    if (targetGroupId === dragId.group) {
      const updatedItems = [...items];
      const dragIndex = updatedItems.findIndex((item) => item.id === dragId.id);

      if (targetItemId) {
        const targetIndex = updatedItems.findIndex(
          (item) => item.id === targetItemId
        );
        updatedItems.splice(dragIndex, 1);
        updatedItems.splice(targetIndex, 0, dragId);
      }
      setItems(updatedItems);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === dragId.id ? { ...item, group: targetGroupId } : item
        )
      );
    }
    setDragId(null);
  };

  return (
    <div style={{ display: "flex", gap: 4 }}>
      {group.map((group, index) => (
        <div
          key={index}
          className="group-1"
          style={{ backgroundColor: "red", width: "40vw", height: "80vh" }}
          onDrop={() => handleDrop(group.id)}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2>{group.value}</h2>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {items
              .filter((item) => item.group === group.id)
              .map((item, index) => (
                <div
                  id={item.id}
                  className="daragabble-card"
                  key={index}
                  style={{
                    width: "80%",
                    height: "10%",
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                  }}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.stopPropagation();
                    handleDrop(group.id, item.id);
                  }}
                >
                  {item.value}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dnd;
