const catches_by = document.getElementById('Catches_by')
const Group = document.getElementById("Group")
const Parametres = document.getElementById('Parametres')
const Spieces = document.getElementById("Species")
const Tablearea = document.getElementById("collapse1")
const button_clicked = document.getElementById('creatbtn')
const table_continer = document.getElementById('collapse1')

$(document).ready(function() {
    $.ajax({
        url: '',
        type: 'get',
        data: {
            ready_text: $(this).text()
        },
        success: function(response) {
            let data = JSON.parse(response.data)
            let spieces_file = data.Spieces_file
            let catch_file = data.data_catch
            let biomass_file = data.data_biomass
            let diet_file = data.Diet_file
            let data_small_spieces = data.data_small_spieces
            let biological_params = data.biological_params

            function SelectParametres() {
                let parametre_selected = Parametres.options[Parametres.selectedIndex].text;
                if ('Catch' == parametre_selected) {
                    Group.length = 0
                    table_continer.innerHTML = ''

                    let years = Object.values(Object.values((catch_file))[0])
                    let latine_name = Object.values(Object.values((catch_file))[1])
                    let funct_group = Object.values(Object.values((catch_file))[2])
                    let catch_data = Object.values(Object.values((catch_file))[3])

                    function catch_function(ch) {
                        function get_index(ch) {
                            l = []
                            for (i = 0; i < years.length; i++) {
                                if (latine_name[i] == ch) {
                                    l.push(i)
                                }
                            }
                            return l
                        }

                        function get_year(ch) {
                            j = get_index(ch)
                            k = []
                            j.forEach(i => {
                                k.push(years[i])
                            })
                            return k
                        }

                        function get_catch(ch) {
                            l = get_index(ch)
                            k = []
                            l.forEach(i => {
                                k.push(catch_data[i])

                            })
                            return k
                        }

                        year = get_year(ch)
                        o = get_catch(ch)

                        dic = {}
                        y = _.uniq(year)
                        for (i = 0; i < y.length; i++)
                            dic[y[i]] = 0


                        for (i = 0; i < y.length; i++) {
                            for (j = 0; j < year.length; j++)
                                if (y[i] == year[j]) {
                                    dic[y[i]] += o[j]
                                }
                        }
                        year = Object.keys(dic)
                        o = Object.values(dic)
                        console.log(o)
                        return [year, o]
                    }


                    let functionnal_group = catch_file["functional_group"]
                    functionnal_group = Object.values(functionnal_group)
                    let functionnal_group_values = _.uniq(Object.values(functionnal_group))
                    for (i = 0; i < functionnal_group_values.length; i++) {
                        let opt = document.createElement('option')
                        opt.value = functionnal_group_values[i]
                        opt.innerHTML = `${functionnal_group_values[i]}`
                        Group.appendChild(opt)
                    }

                    function SelectGoup() {
                        let Group_selected = Group.options[Group.selectedIndex].text;
                        let Group_list = []
                        Group_list.push(Group_selected)
                        slectGroup_value = String(Group_list.pop());
                        let a = Object.values(catch_file)
                            // what I need here is a column in csv file that named latine name to get data from it 
                        function spicesListe() {
                            let slectedspieces = []
                            for (i = 0; i < functionnal_group.length; i++)
                                if (functionnal_group[i] == slectGroup_value) {
                                    slectedspieces.push(Object.values(a[1])[i])
                                };
                            return _.uniq(slectedspieces)
                        }
                        Spieces.length = 0
                        let Spieces_list = spicesListe()
                        for (i = 0; i < Spieces_list.length; i++) {
                            let opt = document.createElement('option')
                            opt.value = Spieces_list[i]
                            opt.innerHTML = `${Spieces_list[i]}`
                            Spieces.appendChild(opt)
                        }

                        function loadData() {
                            const Spiece_value = document.getElementById("Species")
                            let SelectSpiece_value = Spiece_value.options[Spiece_value.selectedIndex].text
                            ch = SelectSpiece_value

                            function graph(ch) {
                                table_continer.innerHTML = `<canvas id="myChart" width="400" height="200"></canvas>`
                                let data_graph = catch_function(ch)
                                let annes = data_graph[0]
                                let madata = data_graph[1]
                                var ctx = document.getElementById('myChart').getContext('2d');
                                var myChart = new Chart(ctx, {
                                    type: 'line',
                                    data: {
                                        labels: annes,
                                        datasets: [{
                                            label: ch,
                                            data: madata,
                                            backgroundColor: ['rgb(221,161,94,0.2)'],
                                            borderColor: ['rgb(221,161,94,0.8)'],
                                            borderWidth: 1
                                        }]
                                    },
                                    options: {
                                        scales: {
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        }
                                    }
                                });
                            }
                            graph(ch)
                        }
                        button_clicked.addEventListener('click', loadData)
                    }
                    Group.addEventListener('click', SelectGoup, false);
                } else if ('Biomass' == parametre_selected) {
                    let small_liste = []
                    Object.values(data_small_spieces).forEach(i => {
                        small_liste.push(i)
                    })
                    let years = (Object.keys(data_small_spieces))
                    years.pop()
                    small_liste = small_liste.reverse()
                    let smallpil_name = small_liste[0]
                    smallpil_name = Object.values(smallpil_name)
                    console.log(smallpil_name)
                    Group.length = 0
                    table_continer.innerHTML = ''
                    let functionnal_group = ['small pilagic']
                    let functionnal_group_values = _.uniq(Object.values(functionnal_group))
                    for (i = 0; i < functionnal_group_values.length; i++) {
                        let opt = document.createElement('option')
                        opt.value = functionnal_group_values[i]
                        opt.innerHTML = `${functionnal_group_values[i]}`
                        Group.appendChild(opt)
                    }

                    function SelectGoupBiomass() {
                        Spieces.length = 0
                        let Spieces_list = smallpil_name
                        for (i = 0; i < Spieces_list.length; i++) {
                            let opt = document.createElement('option')
                            opt.value = Spieces_list[i]
                            opt.innerHTML = `${Spieces_list[i]}`
                            Spieces.appendChild(opt)
                        }

                        function loadData() {
                            const Spiece_value = document.getElementById("Species")
                            let SelectSpiece_value = Spiece_value.options[Spiece_value.selectedIndex].text
                            graph(SelectSpiece_value);
                        }
                        button_clicked.addEventListener('click', loadData)
                    }
                    Group.addEventListener('click', SelectGoupBiomass, false);

                    function graph(ch) {
                        table_continer.innerHTML = `<canvas id="myChart" width="400" height="200"></canvas>`
                        let small_liste = []
                        Object.values(data_small_spieces).forEach(i => {
                            small_liste.push(i)
                        })
                        let years = (Object.keys(data_small_spieces))
                        years.pop()
                        small_liste = small_liste.reverse()
                        let smallpil_name = small_liste[0]
                        smallpil_name = Object.values(smallpil_name)
                        small_liste.shift()

                        function smallpilagic_liste(ch) {
                            function get_index(ch) {
                                let j = smallpil_name.indexOf(ch)
                                return j
                            }
                            let j = get_index(ch)
                            let pushdata = []
                            for (i = 0; i < small_liste.length; i++) {
                                pushdata.push(small_liste[i][j])
                            }
                            let indice = []
                            let x = []
                            for (i = 0; i < pushdata.length; i++) {
                                if (pushdata[i] != '-') {
                                    x.push(parseInt(pushdata[i]))
                                    indice.push(i)
                                }
                            }
                            let ans = []
                            indice.forEach(i => {
                                ans.push(years[i])
                            })
                            let l = [
                                [x],
                                [ans]
                            ]
                            return l
                        }
                        let l = smallpilagic_liste(ch)
                        let annes = []
                        l[1].forEach(i => {
                            annes.push(i)
                        })
                        let madata = []
                        l[0].forEach(i => {
                            madata.push(i)
                        })
                        var ctx = document.getElementById('myChart').getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: annes[0],
                                datasets: [{
                                    label: ch,
                                    data: madata[0],
                                    backgroundColor: ['rgb(221,161,94,0.2)'],
                                    borderColor: ['rgb(221,161,94,0.8)'],
                                    borderWidth: 1
                                }]
                            },
                            options: {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }
                        });
                    }
                    table_continer.innerHTML = ''
                } else if ('Selectionner un Parametre...' == parametre_selected) {
                    Group.length = 0
                    table_continer.innerHTML = ''
                    let opt = document.createElement('option')
                    opt.value = 'Select Group'
                    opt.innerHTML = 'Select Group...'
                    Group.appendChild(opt)

                }
            }
            Parametres.addEventListener('click', SelectParametres, false);

        }

    })
})