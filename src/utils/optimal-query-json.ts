const chunkJson = (json: any, chunkSize: number) => {
  const chunks = [];
  for (let i = 0; i < json.length; i += chunkSize) {
    chunks.push(json.slice(i, i + chunkSize));
  }
  return chunks;
};

const optimalQueryJson = (json: any) => {
  const chunks = chunkJson(json, 1000);
  const query = chunks.map((chunk) => {
    return `SELECT * FROM table WHERE id IN (${chunk.map((item:any) => item.id).join(',')})`;
  });
  return query;
};  
const nonOptimalQueryJson = (json: any) => {
    const query = json.map((item:any) => {
        return `SELECT * FROM table WHERE id = ${item.id}`;
    });
    return query;
}