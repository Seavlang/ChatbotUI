export const chatbotService = async (input, externalSessionId, projectId, apiKey) => {
  console.log("service", input, externalSessionId);
  const response = await fetch('http://110.74.194.123:9080/external_chain/invoke', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'REST-API-KEY': apiKey, // Use the dynamic API key
    },
    body: JSON.stringify({
      input: {
        input,
        external_session_id: externalSessionId,
        project_id: projectId
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
