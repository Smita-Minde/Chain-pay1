async function run() {
  try {
    // Fetch payouts/select/TRC20_TRX with GET
    console.log("Fetching payouts/select/TRC20_TRX with GET (No Auth)...");
    const selectResGet = await fetch('https://sandbox-api.chainpay.biz/payouts/select/TRC20_TRX', {
      method: 'GET'
    });
    console.log("GET status:", selectResGet.status);
    const getData = await selectResGet.json();
    console.log("GET Response:", JSON.stringify(getData, null, 2));

    // Fetch payouts/select/TRC20_TRX with POST
    console.log("Fetching payouts/select/TRC20_TRX with POST (No Auth)...");
    const selectResPost = await fetch('https://sandbox-api.chainpay.biz/payouts/select/TRC20_TRX', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: "10"
      })
    });
    console.log("POST status:", selectResPost.status);
    const postData = await selectResPost.json();
    console.log("POST Response:", JSON.stringify(postData, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
