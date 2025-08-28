const salesTableBody = document.getElementById('sales-table-body');
        const grandTotalElement = document.getElementById('grand-total');
        const discountedTotalElement = document.getElementById('discounted-total');
        const invoiceDetails = document.getElementById('invoice-details');
        const invoiceGrandTotal = document.getElementById('invoice-grand-total');
        const clientNameInput = document.getElementById('client-name');
        const invoiceClientName = document.getElementById('invoice-client-name');

        function addToTable(event) {
            event.preventDefault();

            const productName = document.getElementById('product-name').value;
            const productPrice = parseFloat(document.getElementById('product-price').value);
            const productQuantity = parseInt(document.getElementById('product-quantity').value);

            const total = productPrice * productQuantity;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${productName}</td>
                <td>${productPrice.toFixed(2)}</td>
                <td><input type="number" value="${productQuantity}" min="1" onchange="updateRowTotal(this)"></td>
                <td class="row-total">${total.toFixed(2)}</td>
                <td><button onclick="removeRow(this)">✕</button></td>
            `;
            salesTableBody.appendChild(row);

            updateGrandTotal();
            resetForm();
        }

        function updateRowTotal(input) {
            const row = input.closest('tr');
            const price = parseFloat(row.children[1].textContent);
            const quantity = parseInt(input.value);
            const totalCell = row.children[3];

            const total = price * quantity;
            totalCell.textContent = total.toFixed(2);

            updateGrandTotal();
        }

        function updateGrandTotal() {
            let grandTotal = 0;
            const rows = salesTableBody.querySelectorAll('tr');
            rows.forEach(row => {
                const rowTotal = parseFloat(row.children[3].textContent);
                grandTotal += rowTotal;
            });
            grandTotalElement.textContent = grandTotal.toFixed(2);
            // Ne pas appliquer la réduction automatiquement
        }

        function appliquerReduction() {
            const discount = parseFloat(document.getElementById('discount').value) || 0;
            const grandTotal = parseFloat(grandTotalElement.textContent);
            const discountedTotal = grandTotal - (grandTotal * discount / 100);
            discountedTotalElement.textContent = discountedTotal.toFixed(2);
        }

        function removeRow(button) {
            const row = button.closest('tr');
            row.remove();
            updateGrandTotal();
        }

        function resetForm() {
            document.getElementById('sales-form').reset();
        }

        function resetTable() {
            salesTableBody.innerHTML = '';
            updateGrandTotal();
            discountedTotalElement.textContent = "0.00";
            document.getElementById('discount').value = "";
        }

        function printInvoice() {
            const clientName = clientNameInput.value;
            invoiceClientName.textContent = clientName || "Non spécifié";

            invoiceDetails.innerHTML = '';
            const rows = salesTableBody.querySelectorAll('tr');
            rows.forEach(row => {
                const productName = row.children[0].textContent;
                const productPrice = row.children[1].textContent;
                const productQuantity = row.children[2].querySelector('input').value;
                const productTotal = row.children[3].textContent;

                const detailRow = document.createElement('tr');
                detailRow.innerHTML = `
                    <td>${productName}</td>
                    <td>${productPrice}</td>
                    <td>${productQuantity}</td>
                    <td>${productTotal}</td>
                `;
                invoiceDetails.appendChild(detailRow);
            });

            // Afficher la réduction sur la facture si elle existe
            const discount = parseFloat(document.getElementById('discount').value) || 0;
            const grandTotal = parseFloat(grandTotalElement.textContent);
            let discountRow = '';
            if (discount > 0) {
                const discountValue = (grandTotal * discount / 100).toFixed(2);
                discountRow = `<p><strong>Réduction appliquée (${discount}%) :</strong> -${discountValue} $</p>`;
            }
            document.getElementById('invoice-discount-row').innerHTML = discountRow;

            invoiceGrandTotal.textContent = discountedTotalElement.textContent;

            const printContent = document.getElementById('invoice').innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload();
        }

        function validerPaiement() {
            if (salesTableBody.children.length === 0) {
                alert("Veuillez ajouter au moins un article dans le panier.");
                return;
            }
            const clientName = clientNameInput.value || "Non spécifié";
            const total = discountedTotalElement.textContent;
            alert(
                "Paiement validé !\n\nClient : " + clientName +
                "\nTotal à payer : " + total + " $"
            );
            // Ici, vous pouvez ajouter la logique pour enregistrer la vente ou rediriger, etc.
        }
        