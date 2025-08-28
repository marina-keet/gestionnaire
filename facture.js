 // Exemple statique, à remplacer par des données dynamiques selon votre stockage
        document.getElementById('facture-date').textContent = new Date().toLocaleDateString();
        const articles = [
            { nom: "Pain", prix: 2.50, quantite: 2 },
            { nom: "Lait", prix: 1.50, quantite: 1 },
            { nom: "Bananes", prix: 0.80, quantite: 5 }
        ];
        let total = 0;
        const tbody = document.getElementById('facture-articles');
        articles.forEach(a => {
            const t = (a.prix * a.quantite);
            total += t;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${a.nom}</td>
                <td>${a.prix.toFixed(2)} $</td>
                <td>${a.quantite}</td>
                <td>${t.toFixed(2)} $</td>
            `;
            tbody.appendChild(tr);
        });
        document.getElementById('facture-total').textContent = total.toFixed(2);