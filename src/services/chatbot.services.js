export const chatbotService = async (input, externalSessionId, projectId, apiKey) => {
  console.log("service", input, externalSessionId);
  const response = await fetch('http://203.255.78.58:9000/hrd_chain/invoke', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'REST-API-KEY': apiKey, // Use the dynamic API key
    },
    body: JSON.stringify({
      input: {
        input,
        session_id
      }
    })
  });

  console.log('Response Status:', response.status); // Log the status for debugging

  if (!response.ok) {
    throw new Error(`Failed to invoke external chain: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("output", data.output);
  return data;
};


export const generateExternalSession = async (apiKey) => {
  const response = await fetch('https://api2.texbot.space/api/v1/api_generation/session/create_session', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'REST-API-KEY': apiKey, // Use the dynamic API key
    },
  });
  console.log('Response Status:', response.status); // Log the status for debugging

  if (!response.ok) {
    throw new Error(`Failed to create external session: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("output", data);
  return data;
}