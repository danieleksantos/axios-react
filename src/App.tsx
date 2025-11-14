import axios from 'axios'
import { useState } from 'react'
import * as S from './styles'
import { type IAdress, type ICountry, type IRepository } from './types'

export function App() {
  const [cep, setCep] = useState('')
  const [adress, setAdress] = useState<IAdress | null>(null)
  const [cepError, setCepError] = useState<string | null>(null)

  const [user, setUser] = useState('')
  const [repositories, setRepositories] = useState<IRepository[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchAttempted, setSearchAttempted] = useState(false)

  const [countryName, setCountryName] = useState('')
  const [country, setCountry] = useState<ICountry | null>(null)
  const [countryError, setCountryError] = useState<string | null>(null)

  async function fetchAdress(): Promise<void> {
    const cleanCep = cep.replace(/\s/g, '')

    setAdress(null)
    setCepError(null)

    if (cleanCep.length !== 8) {
      setCepError('O CEP deve ter apenas números e 8 dígitos.')
      return
    }

    try {
      const response = await axios.get<IAdress>(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      )

      if (response.data && response.data.erro === true) {
        setCepError(`CEP ${cleanCep} não encontrado.`)
        return
      }

      setAdress(response.data)
    } catch (error) {
      setCepError('Erro na conexão ou requisição. Tente novamente.')
      console.log('Erro na requisição de CEP:', error)
    }
  }

  function clearCepSearch(): void {
    setCep('')
    setAdress(null)
    setCepError(null)
  }

  async function fetchRepositories(): Promise<void> {
    setSearchAttempted(true)
    setRepositories([])
    setSearchTerm('')

    try {
      const responseGithub = await axios.get(
        `https://api.github.com/users/${user}/repos`,
      )
      setRepositories(responseGithub.data)
    } catch (error) {
      console.log('Erro na busca de repositórios:', error)
      setRepositories([])
    }
  }

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  function clearRepoSearch(): void {
    setUser('')
    setRepositories([])
    setSearchTerm('')
    setSearchAttempted(false)
  }

  async function fetchCountry(): Promise<void> {
    const cleanName = countryName.trim()

    setCountry(null)
    setCountryError(null)

    if (cleanName.length === 0) {
      setCountryError('Por favor, insira o nome de um país.')
      return
    }

    try {
      const apiUrl = `https://restcountries.com/v3.1/name/${cleanName}?fullText=true`
      const response = await axios.get<ICountry[]>(apiUrl)

      if (response.data && response.data.length > 0) {
        setCountry(response.data[0])
      } else {
        setCountryError(`País "${cleanName}" não encontrado.`)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setCountryError(`País "${cleanName}" não encontrado.`)
      } else {
        setCountryError('Erro na conexão ou requisição. Tente novamente.')
        console.log('Erro na requisição da API de Países:', error)
      }
    }
  }

  function clearCountrySearch(): void {
    setCountryName('')
    setCountry(null)
    setCountryError(null)
  }

  return (
    <S.Container>
      <S.Title>Estudos de Requisição HTTP via Axios</S.Title>

      <S.Card>
        <S.SectionTitle $primaryColor={S.COLOR_CEP}>API CEP</S.SectionTitle>
        <S.Subtitle>Pesquise o endereço pelo CEP:</S.Subtitle>

        <S.InputGroup>
          <S.Input
            $primaryColor={S.COLOR_CEP}
            type="text"
            value={cep}
            onChange={(event) => setCep(event.target.value.replace(/\s/g, ''))}
            placeholder="Ex: 13418111"
          />
          <S.SearchButton $primaryColor={S.COLOR_CEP} onClick={fetchAdress}>
            Pesquisar
          </S.SearchButton>
          <S.ClearButton onClick={clearCepSearch}>Limpar</S.ClearButton>
        </S.InputGroup>

        {cepError && (
          <S.ErrorMessage>
            <p>
              <S.ErrorBold>Erro:</S.ErrorBold> {cepError}
            </p>
          </S.ErrorMessage>
        )}

        {adress && (
          <S.CepAddressResult>
            <p>
              <S.CepAddressSpan>Logradouro:</S.CepAddressSpan>
              {adress.logradouro}
            </p>
            <p>
              <S.CepAddressSpan>Bairro:</S.CepAddressSpan>
              {adress.bairro}
            </p>
            <p>
              <S.CepAddressSpan>Cidade:</S.CepAddressSpan>
              {adress.localidade}
            </p>
            <p>
              <S.CepAddressSpan>Estado:</S.CepAddressSpan>
              {adress.uf}
            </p>
          </S.CepAddressResult>
        )}
      </S.Card>

      <S.Divider />

      <S.Card>
        <S.SectionTitle $primaryColor={S.COLOR_GITHUB}>
          API GITHUB
        </S.SectionTitle>
        <S.Subtitle>
          Pesquise repositórios de usuários do Github pelo user:
        </S.Subtitle>

        <S.InputGroup>
          <S.Input
            $primaryColor={S.COLOR_GITHUB}
            type="text"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="Digite nome de um usuário"
          />
          <S.SearchButton
            $primaryColor={S.COLOR_GITHUB}
            onClick={fetchRepositories}
          >
            Pesquisar
          </S.SearchButton>
          <S.ClearButton onClick={clearRepoSearch}>Limpar</S.ClearButton>
        </S.InputGroup>

        {searchAttempted && (
          <S.ResultsArea>
            {repositories.length > 0 ? (
              <>
                <S.FilterLabel>Filtrar por nome:</S.FilterLabel>
                <S.Input
                  $primaryColor={S.COLOR_GITHUB}
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Digite parte do título do repo"
                />

                <S.ResultsCount>
                  {filteredRepositories.length} repositórios encontrado(s)
                </S.ResultsCount>

                <S.RepoList>
                  {filteredRepositories.map((repository) => (
                    <S.RepoItem key={repository.id}>
                      <S.RepoLink
                        href={repository.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repository.name}
                      </S.RepoLink>
                      {repository.description && (
                        <S.RepoDescription>
                          {repository.description}
                        </S.RepoDescription>
                      )}
                    </S.RepoItem>
                  ))}
                </S.RepoList>
              </>
            ) : (
              <S.NoResultsMessage>
                Nenhum repositório encontrado para o usuário
                <S.Username>{user}</S.Username>.
              </S.NoResultsMessage>
            )}
          </S.ResultsArea>
        )}
      </S.Card>

      <S.Divider />

      <S.Card>
        <S.SectionTitle $primaryColor={S.COLOR_COUNTRIES}>
          API REST COUNTRIES
        </S.SectionTitle>
        <S.Subtitle>
          Pesquise dados de um país (Ex: Brazil, Portugal):
        </S.Subtitle>

        <S.InputGroup>
          <S.Input
            $primaryColor={S.COLOR_COUNTRIES}
            type="text"
            value={countryName}
            onChange={(event) => setCountryName(event.target.value)}
            placeholder="Digite o nome do país em inglês"
          />
          <S.SearchButton
            $primaryColor={S.COLOR_COUNTRIES}
            onClick={fetchCountry}
          >
            Pesquisar
          </S.SearchButton>
          <S.ClearButton onClick={clearCountrySearch}>Limpar</S.ClearButton>
        </S.InputGroup>

        {countryError && (
          <S.ErrorMessage>
            <p>
              <S.ErrorBold>Erro:</S.ErrorBold> {countryError}
            </p>
          </S.ErrorMessage>
        )}

        {country && (
          <S.CountriesResult>
            <S.CountryFlag
              src={country.flags.png}
              alt={country.flags.alt || `Bandeira de ${country.name.common}`}
            />
            <S.CountriesName $primaryColor={S.COLOR_COUNTRIES}>
              {country.name.common}
            </S.CountriesName>

            <S.DetailGroup>
              <S.CountryDetail>
                <span>Nome Oficial:</span> {country.name.official}
              </S.CountryDetail>
              <S.CountryDetail>
                <span>Capital:</span> {country.capital.join(', ') || 'N/A'}
              </S.CountryDetail>
              <S.CountryDetail>
                <span>População:</span>{' '}
                {country.population.toLocaleString('pt-BR')}
              </S.CountryDetail>
              <S.CountryDetail>
                <span>Região:</span> {country.region}
              </S.CountryDetail>
            </S.DetailGroup>
          </S.CountriesResult>
        )}
      </S.Card>
    </S.Container>
  )
}
