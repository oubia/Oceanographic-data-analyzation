const catches_by = document.getElementById('Catches_by')
const Group = document.getElementById("Group")
const Parametres = document.getElementById('Parametres')
const Spieces = document.getElementById("Species")
const Tablearea = document.getElementById("collapse1")
const button_clicked = document.getElementById('creatbtn')

function SelectCatches() {
    let catches_selected = catches_by.options[catches_by.selectedIndex].text;
    let catches_list = []
    catches_list.push(catches_selected)
    console.log(catches_list)
}
catches_by.addEventListener('click', SelectCatches, false);

// function SelectGoup() {
//     let Group_selected = Group.options[Group.selectedIndex].text;
//     let Group_list = []
//     Group_list.push(Group_selected)
//     console.log(Group_list.pop());

// }
// Group.addEventListener('click', SelectGoup, false);

// function SelectSpiece() {
//     let Spiece_selected = Spieces.options[Spieces.selectedIndex].text;
//     let Spieces_list = []
//     Spieces_list.push(Spiece_selected)
//         // console.log(`data is here${Spieces_list}`)
//     return Spieces_list


// }
// Spieces.addEventListener('click', SelectSpiece, false)


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

            // console.log(array.forEach(element => {
            // }))


            function SelectParametres() {
                let parametre_selected = Parametres.options[Parametres.selectedIndex].text;
                if ('Species characteristic' == parametre_selected) {
                    Group.length = 0
                    let functionnal_group = Object.values(spieces_file["Functional group"]);
                    let functionnal_group_values = _.uniq(Object.values(spieces_file["Functional group"]))
                    for (i = 0; i < functionnal_group_values.length; i++) {
                        let opt = document.createElement('option')
                        opt.value = functionnal_group_values[i]
                        opt.innerHTML = `${functionnal_group_values[i]}`
                        Group.appendChild(opt)
                    }


                    function SelectGoup() {
                        let Group_selected = Group.options[Group.selectedIndex].text;
                        let Group_list = ['0']
                        Group_list.push(Group_selected)
                        slectGroup_value = String($(Group_list).get(-1));
                        console.log(slectGroup_value)
                        spieces_file = Object.assign(spieces_file)

                        function spicesListe() {
                            let slectedspieces = []
                            for (i = 0; i < functionnal_group.length; i++)
                                if (functionnal_group[i] == slectGroup_value) {
                                    slectedspieces.push(Object.values(Object.values(spieces_file))[1][i])
                                };
                            return slectedspieces
                        }
                        Spieces.length = 0
                        let Spieces_list = spicesListe()
                        for (i = 0; i < Spieces_list.length; i++) {
                            let opt = document.createElement('option')
                            opt.value = Spieces_list[i]
                            opt.innerHTML = `${Spieces_list[i]}`
                            Spieces.appendChild(opt)
                        }

                    }
                    Group.addEventListener('click', SelectGoup, false);


                    // function SelectSpiece() {
                    //     let Spiece_selected = Spieces.options[Spieces.selectedIndex].text;
                    //     let Spieces_list_selected = ['0']
                    //     Spieces_list_selected.push(Spiece_selected)
                    //     SelectSpiece_value = String($(Spieces_list_selected).get(-1));
                    //     console.log(SelectSpiece_value)
                    //         // let datainitial = []
                    //     datainitial = Object.values(spieces_file)
                    // }

                    function loadData() {
                        const SelectSpiece_value = document.getElementById("Species")
                        const slectGroup_value = document.getElementById("Group")
                        let someliste = Object.values((Object.values(spieces_file)))
                            // let resulte = Object.keys(spieces_file).map((key) => [String(key), spieces_file[key]])

                        // console.log(resulte))
                        let common_name = (Object.values((Object.entries(spieces_file))[0][1]))
                        let latine_name = (Object.values((Object.entries(spieces_file))[1][1]))
                        let commircial_group = (Object.values((Object.entries(spieces_file))[3][1]))
                        let Max_length = (Object.values((Object.entries(spieces_file))[4][1]))
                        console.log((Object.values((Object.entries(spieces_file))[5])))
                        console.log(`value of select${SelectSpiece_value.value}`)
                        console.log(`value of group${slectGroup_value.values}`)
                            // console.log(funclist)
                            // a = datainitial.pop()
                            // console.log(datainitial.pop())
                            // if ($.inArray(SelectSpiece_value, someliste) && $.inArray(slectGroup_value, funclist)) {
                            //     // if (SelectSpiece_value in (Object.values(spieces_file)))
                            //     // let indexliste = someliste.indexOf(SelectSpiece_value)
                            //     // let indexfunc = funclist.indexOf(slectGroup_value)
                            //     // console.log(indexliste)
                            //     // console.log(indexfunc)
                            //     // for (let i = 0; i < array.length; i++) {
                            //     //     const element = array[i];

                        //     // }
                        // }
                        // console.log(a)
                    }

                    button_clicked.addEventListener('click', loadData)
                        // Spieces.addEventListener('click', SelectSpiece, false)

                    function createTableCaractiristc() {
                        // Tablearea



                    }

                } else if ('Catch' == parametre_selected) {
                    Group.length = 0
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
                        // catch_file = Object.assign(catch_file)

                        let a = Object.values(catch_file)
                            // what I need here is a column in csv file that named latine name to get data from it 
                        function spicesListe() {
                            let slectedspieces = []
                            for (i = 0; i < functionnal_group.length; i++)
                                if (functionnal_group[i] == slectGroup_value) {
                                    slectedspieces.push(Object.values(a[1])[i])
                                };
                            return slectedspieces
                        }
                        Spieces.length = 0
                        console.log(spicesListe())
                        let Spieces_list = spicesListe()
                        for (i = 0; i < Spieces_list.length; i++) {
                            let opt = document.createElement('option')
                            opt.value = Spieces_list[i]
                            opt.innerHTML = `${Spieces_list[i]}`
                            Spieces.appendChild(opt)
                        }

                    }
                    Group.addEventListener('click', SelectGoup, false);
                } else if ('Biomass' == parametre_selected) {
                    // Group.length = 0
                    // let functionnal_group = biomass_file["Functional group"]
                    // let functionnal_group_values = _.uniq(Object.values(functionnal_group))
                    // for (i = 0; i < functionnal_group_values.length; i++) {
                    //     let opt = document.createElement('option')
                    //     opt.value = functionnal_group_values[i]
                    //     opt.innerHTML = `${functionnal_group_values[i]}`
                    //     Group.appendChild(opt)
                    // }
                    Group.length = 0
                    let functionnal_group = Object.values(spieces_file["Functional group"]);
                    let functionnal_group_values = _.uniq(Object.values(spieces_file["Functional group"]))
                    for (i = 0; i < functionnal_group_values.length; i++) {
                        let opt = document.createElement('option')
                        opt.value = functionnal_group_values[i]
                        opt.innerHTML = `${functionnal_group_values[i]}`
                        Group.appendChild(opt)
                    }

                    function SelectGoup() {
                        let Group_selected = Group.options[Group.selectedIndex].text;
                        let Group_list = ['0']
                        Group_list.push(Group_selected)
                        slectGroup_value = String($(Group_list).get(-1));
                        console.log(slectGroup_value)
                        spieces_file = Object.assign(spieces_file)

                        function spicesListe() {
                            let slectedspieces = []
                            for (i = 0; i < functionnal_group.length; i++)
                                if (functionnal_group[i] == slectGroup_value) {
                                    slectedspieces.push(Object.values(Object.values(spieces_file))[1][i])
                                };
                            return slectedspieces
                        }
                        Spieces.length = 0
                        let Spieces_list = spicesListe()
                        for (i = 0; i < Spieces_list.length; i++) {
                            let opt = document.createElement('option')
                            opt.value = Spieces_list[i]
                            opt.innerHTML = `${Spieces_list[i]}`
                            Spieces.appendChild(opt)
                        }

                    }
                    Group.addEventListener('click', SelectGoup, false);


                    function graph() {
                        let liste = [];
                        let dataliste = []
                        Object.values(data_small_spieces).forEach(i => {
                            dataliste.push(i)
                        })
                        let years = (Object.keys(data_small_spieces))
                        years.pop()
                        dataliste = dataliste.reverse()
                        let smallpil_name = dataliste[0]
                        smallpil_name = Object.values(smallpil_name)
                            // console.log(l)
                            // Scomber colias
                            // Engraulis encrasicolus
                            // Sardina pilchardus
                        let ch = document.getElementById("Species")
                        ch = ch.value
                        console.log(ch)
                        dataliste.shift()

                        function smallpilagic_liste(ch) {
                            function get_index(ch) {
                                let j = smallpil_name.indexOf(ch)
                                return j
                            }
                            let j = get_index(ch)
                            let pushdata = []
                            for (i = 0; i < dataliste.length; i++) {
                                pushdata.push(dataliste[i][j])
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
                                    backgroundColor: ['rgb(0,0,0,0.2)'],
                                    borderColor: ['rgb(0,0,0,0.8)'],
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


                    function SelectSpiece() {
                        let Spiece_selected = Spieces.options[Spieces.selectedIndex].text;
                        let Spieces_list = []
                        Spieces_list.push(Spiece_selected)
                            // console.log(`data is here${Spieces_list}`)
                        console.log(Spieces_list)
                    }
                    Spieces.addEventListener('click', SelectSpiece, false)
                    button_clicked.addEventListener('click', graph)

                } else if ('Diet composition' == parametre_selected) {
                    Group.length = 0
                    let functionnal_group = diet_file["Prey \\ predator"]
                    let functionnal_group_values = _.uniq(Object.values(functionnal_group))
                    for (i = 0; i < functionnal_group_values.length; i++) {
                        let opt = document.createElement('option')
                        opt.value = functionnal_group_values[i]
                        opt.innerHTML = `${functionnal_group_values[i]}`
                        Group.appendChild(opt)
                    }
                } else if ('Biological parameters' == parametre_selected) {
                    Group.length = 0
                    console.log(diet_file)
                    let functionnal_group = diet_file["Prey \\ predator"]
                    let functionnal_group_values = _.uniq(Object.values(functionnal_group))
                    for (i = 0; i < functionnal_group_values.length; i++) {
                        let opt = document.createElement('option')
                        opt.value = functionnal_group_values[i]
                        opt.innerHTML = `${functionnal_group_values[i]}`
                        Group.appendChild(opt)
                    }
                } else if ('Selectionner un Parametre...' == parametre_selected) {
                    Group.length = 0
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