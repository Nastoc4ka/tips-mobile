import React from 'react';

const OrganizationSearch = () => {
    return (
        <View style={focus ? organisationInput.container : null}>
                    {focus 
                        ? <TouchableOpacity style={closeBtn.btn} onPress={cleanSearchOrganisation}>
                            <Text style={closeBtn.text}>x</Text>
                        </TouchableOpacity> 
                        : null
                    }
                    
                    <Input
                        label='Заведение'
                        onFocus={() => setFocus(true)}
                        refs={organisationInputRef}
                        value={data.organisation}
                        maxLength={60}
                        message={errors.organisation}
                        handleChange={onSearch}
                    >
                        <TouchableOpacity onPress={() => onSearch('')}>
                            <IconInInputView>
                                {focus && data.organisation ? <Text style={closeBtn.text}>x</Text> : null}
                            </IconInInputView>
                        </TouchableOpacity>
                    </Input>

                    {searching 
                        ? <SearchDropDown
                            onPress={(id, name) => chooseOrganisation(id, name)}
                            dataSource={filtered}
                        /> 
                        : null
                    }
                </View>

    )
}

export default OrganizationSearch;