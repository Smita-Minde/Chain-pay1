async function run() {
  try {
    const res = await fetch('https://sandbox-api.chainpay.biz/networks');
    const data = await res.json();
    console.log("Networks:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}
run();
