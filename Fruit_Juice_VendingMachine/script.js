let currentAmount = 0; // ยอดเงินปัจจุบัน
let selectedProductPrice = 0; // ราคาสินค้าที่เลือก
let selectedProductStock = 0; // สต็อกสินค้าที่เลือก
let selectedProductName = ''; // ชื่อสินค้าที่เลือก
let isMachineWorking = false; // ตัวแปรเก็บสถานะการทำงาน

// เพิ่มเหตุการณ์เมื่อคลิกที่ปุ่มสินค้า
document.querySelectorAll('.product').forEach(button => {
    button.addEventListener('click', () => {
        // ลบคลาส selected จากปุ่มทั้งหมดก่อน
        document.querySelectorAll('.product').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.innerText !== 'หมด') { // ไม่รีเซ็ตปุ่มที่มีสถานะ "หมด"
                btn.innerText = 'เลือกสินค้า'; // รีเซ็ตข้อความ
                btn.style.backgroundColor = '#43a047'; // รีเซ็ตสีพื้นหลัง
            }
        });

        // ตรวจสอบสถานะของเครื่อง
        if (!isMachineWorking) {
            const card = button.closest('.card'); // หา card ของปุ่มที่ถูกคลิก
            selectedProductPrice = parseInt(card.getAttribute('data-price')); // รับราคาสินค้า
            selectedProductStock = parseInt(card.querySelector('.stock').innerText); // รับจำนวนคงเหลือของสินค้า
            selectedProductName = card.querySelector('h3').innerText; // รับชื่อสินค้าที่เลือก

            // เช็คว่าสินค้ามีคงเหลือหรือไม่
            if (selectedProductStock > 0) {
                document.getElementById('message').innerText = `คุณเลือก: ${selectedProductName}`; // แสดงข้อความเมื่อเลือกสินค้า
                button.classList.add('selected'); // เพิ่มคลาส selected ให้ปุ่มที่เลือก
                button.innerText = 'เลือกแล้ว'; // เปลี่ยนข้อความเมื่อเลือกสินค้า
                button.style.backgroundColor = 'yellow'; // เปลี่ยนสีเมื่อเลือกสินค้า
            } else {
                button.innerText = 'หมด'; // เปลี่ยนข้อความเป็น "หมด"
                button.style.backgroundColor = 'red'; // เปลี่ยนสีเป็นแดง
                document.getElementById('message').innerText = `สินค้าหมด: กรุณาเลือกสินค้าอื่น`; // แจ้งเตือนว่าสินค้าหมด
                selectedProductStock = 0; // ตั้งค่าสินค้าเป็น 0 อัตโนมัติ
                selectedProductPrice = 0; // ป้องกันการซื้อสินค้าที่หมดแล้ว
            }
        } else {
            document.getElementById('message').innerText = 'เครื่องกำลังทำงาน รอให้เสร็จก่อน'; // แจ้งเตือนว่าเครื่องกำลังทำงาน
        }
    });
});

// เพิ่มเหตุการณ์เมื่อคลิกปุ่มเพิ่มเงิน
document.querySelectorAll('.add-amount').forEach(button => {
    button.addEventListener('click', () => {
        if (selectedProductPrice > 0 && !isMachineWorking) {
            const amount = parseInt(button.getAttribute('data-amount')); // รับจำนวนเงินที่จะเพิ่ม
            currentAmount += amount; // เพิ่มยอดเงิน
            document.getElementById('message').innerText = `ยอดเงินปัจจุบัน: ${currentAmount} บาท`; // แสดงยอดเงินปัจจุบัน
        } else if (selectedProductPrice === 0) {
            document.getElementById('message').innerText = 'กรุณาเลือกสินค้าก่อนใส่เงิน'; // แจ้งเตือนให้เลือกสินค้าก่อน
        } else {
            document.getElementById('message').innerText = 'เครื่องกำลังทำงาน กรุณารอ'; // แจ้งเตือนว่าเครื่องกำลังทำงาน
        }
    });
});

// เพิ่มเหตุการณ์เมื่อคลิกปุ่มซื้อสินค้า
document.getElementById('buy').addEventListener('click', () => {
    if (selectedProductPrice === 0) {
        document.getElementById('message').innerText = 'กรุณาเลือกสินค้าก่อน'; // แจ้งเตือนให้เลือกสินค้าก่อน
    } else if (selectedProductPrice > 0 && currentAmount >= selectedProductPrice && selectedProductStock > 0 && !isMachineWorking) {
        isMachineWorking = true; // ตั้งสถานะว่าเครื่องกำลังทำงาน
        document.getElementById('status').innerText = 'สถานะ: กำลังทำงาน...'; // เปลี่ยนสถานะเครื่อง
        const card = document.querySelector(`.card[data-price="${selectedProductPrice}"]`); // หา card ของสินค้า
        const change = currentAmount - selectedProductPrice; // คำนวณเงินทอน
        currentAmount = 0; // รีเซ็ตยอดเงินปัจจุบัน

        // อัปเดตจำนวนสต็อก
        selectedProductStock--;
        card.querySelector('.stock').innerText = selectedProductStock; // แสดงจำนวนสต็อกใหม่

        document.getElementById('message').innerText = `ซื้อ ${selectedProductName} เสร็จสิ้น! ระบบกำลังเตรียมสินค้า...`; // แสดงข้อความยืนยันการซื้อ

        let countdown = 10; // กำหนดเวลา 10 วินาที
        const countdownInterval = setInterval(() => {
            document.getElementById('message').innerText = `กำลังเตรียมสินค้า... ${countdown} วินาที`; // แสดงข้อความเตรียมสินค้า
            countdown--;

            if (countdown < 0) {
                clearInterval(countdownInterval); // หยุดการนับถอยหลัง
                isMachineWorking = false; // ตั้งค่าเครื่องกลับเป็นว่าง
                document.getElementById('status').innerText = 'สถานะ: พร้อมใช้งาน'; // เปลี่ยนสถานะเครื่องกลับ
                document.getElementById('message').innerText = `ซื้อ ${selectedProductName} เสร็จสิ้น! เงินทอน: ${change} บาท`; // แสดงข้อความเมื่อซื้อเสร็จ

                // แสดงปุ่มกดรับสินค้า
                document.getElementById('product-output').innerHTML = `
                    <button id="receive-product" class="receive-product">กดรับสินค้า</button>
                `;

                // รีเซ็ตค่าตัวแปรสินค้าที่เลือก
                selectedProductPrice = 0;
                selectedProductStock = 0;
                selectedProductName = '';

                // รีเซ็ตปุ่มที่ถูกเลือกกลับเป็นเหมือนเดิม
                document.querySelectorAll('.product').forEach(btn => {
                    btn.classList.remove('selected');
                    if (btn.innerText !== 'หมด') { // ไม่รีเซ็ตปุ่มที่มีสถานะ "หมด"
                        btn.innerText = 'เลือกสินค้า'; // รีเซ็ตข้อความ
                        btn.style.backgroundColor = '#43a047'; // รีเซ็ตสีพื้นหลัง
                    }
                });

                // เพิ่มเหตุการณ์ให้ปุ่มรับสินค้า
                document.getElementById('receive-product').addEventListener('click', () => {
                    document.getElementById('message').innerText = `รับสินค้า: ${selectedProductName} สำเร็จ!`; // แสดงข้อความรับสินค้า
                    document.getElementById('product-output').innerHTML = ''; // ลบปุ่มหลังจากกดรับสินค้า
                });
            }
        }, 1000); // ตั้งเวลาให้ทำงานทุก 1 วินาที
    } else if (selectedProductStock === 0) {
        document.getElementById('message').innerText = 'สินค้าหมด! กรุณาเลือกสินค้าอื่น'; // แจ้งเตือนว่าสินค้าหมด
    } else if (currentAmount < selectedProductPrice) {
        document.getElementById('message').innerText = 'เงินไม่พอ! กรุณาเพิ่มเงิน'; // แจ้งเตือนว่าเงินไม่เพียงพอ
    } else if (isMachineWorking) {
        document.getElementById('message').innerText = 'เครื่องกำลังทำงาน กรุณารอ'; // แจ้งเตือนว่าเครื่องกำลังทำงาน
    }
});

// เพิ่มเหตุการณ์เมื่อคลิกปุ่มยกเลิกการซื้อ
document.getElementById('cancel').addEventListener('click', () => {
    if (isMachineWorking) {
        document.getElementById('message').innerText = 'เครื่องกำลังทำงาน ไม่สามารถยกเลิกได้'; // แจ้งเตือนว่าไม่สามารถยกเลิกได้
    } else if (selectedProductPrice === 0) {
        // แจ้งเตือนกรณีที่ยังไม่ได้เลือกสินค้า
        document.getElementById('message').innerText = 'กรุณาเลือกสินค้าก่อน'; // แจ้งเตือนให้เลือกสินค้าก่อน
    } else {
        // แสดงข้อความ indicating the purchase has been canceled
        const refundAmount = currentAmount; // เก็บจำนวนเงินที่จะคืน
        currentAmount = 0; // Reset current amount

        // Reset selected product to allow choosing a new product
        selectedProductPrice = 0;
        selectedProductStock = 0;
        selectedProductName = '';

        // รีเซ็ตปุ่มที่ถูกเลือกกลับเป็นเหมือนเดิม
        document.querySelectorAll('.product').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.innerText !== 'หมด') { // ไม่รีเซ็ตปุ่มที่มีสถานะ "หมด"
                btn.innerText = 'เลือกสินค้า'; // รีเซ็ตข้อความ
                btn.style.backgroundColor = '#43a047'; // รีเซ็ตสีพื้นหลัง
            }
        });

        // แสดงข้อความยกเลิกการซื้อสินค้าพร้อมเงินที่คืน (ถ้ามี)
        if (refundAmount > 0) {
            document.getElementById('message').innerText = `ยกเลิกการซื้อสินค้าสำเร็จ! คืนเงินทั้งหมด: ${refundAmount} บาท`; // แสดงจำนวนเงินที่คืน
        } else {
            document.getElementById('message').innerText = `ยกเลิกการซื้อสินค้าสำเร็จ`; // แสดงข้อความยกเลิก
        }
    }
});
